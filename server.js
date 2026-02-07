import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ⚠️ API KEY BURAYA YAZILMAYACAK
// Render'da Environment Variable olarak ekleyeceğiz
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Ana sayfa
app.get("/", (req, res) => {
  res.send("ChatGPT backend çalışıyor 🚀");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [{ role: "user", content: userMessage }],
        }),
      }
    );

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (e) {
    res.json({ reply: "Sunucu hatası 😢" });
  }
});

// Port (Render için önemli)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server çalışıyor → " + PORT);
});
