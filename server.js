import express from "express"
import { reviewPullRequest } from "./review.js"

const app = express()
app.use(express.json())

app.post("/webhook", async (req, res) => {
  const event = req.headers["x-github-event"]


  console.log(event, "event")
  console.log(req.event, "req event")
  console.log(req.events, "req events")
  console.log(req.body, "req body")
  if (event === "pull_request") {
    const action = req.body.action

    if (action === "opened" || action === "synchronize") {
      const repo = req.body.repository.full_name
      const prNumber = req.body.pull_request.number

      await reviewPullRequest(repo, prNumber)
    }
  }

  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log("Server running")
})