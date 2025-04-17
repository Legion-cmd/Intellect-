const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/ask", async (req, res) => {
  const question = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo"
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    console.error(e);
    res.json({ reply: "Ошибка при обращении к ИИ." });
  }
});

app.use(express.static("."));

app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});
