// gpt-server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8787;

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/narrate", async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).send({ error: "Failed to fetch GPT narration." });
  }
});

app.listen(port, () => {
  console.log(`GPT proxy server running on http://localhost:${port}`);
});
