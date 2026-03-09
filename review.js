import OpenAI from "openai"
import { getPRFiles, postComment } from "./github.js"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function reviewPullRequest(repo, prNumber) {
  const files = await getPRFiles(repo, prNumber)

  const diff = files
    .map(f => `File: ${f.filename}\n${f.patch}`)
    .join("\n")

  const prompt = `
You are a senior software engineer performing a code review.

Analyze this git diff and provide feedback about:
- bugs
- security
- performance
- readability

Keep the review concise.

${diff}
`

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  })

  const review = response.choices[0].message.content

  await postComment(repo, prNumber, `🤖 AI Code Review\n\n${review}`)
}