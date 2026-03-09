import axios from "axios"

const token = process.env.GITHUB_TOKEN

export async function getPRFiles(repo, prNumber) {
  const res = await axios.get(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/files`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json"
      }
    }
  )

  return res.data
}

export async function postComment(repo, prNumber, body) {
  await axios.post(
    `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
    { body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json"
      }
    }
  )
}