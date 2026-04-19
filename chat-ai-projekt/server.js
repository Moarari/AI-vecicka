import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();

        // Ak API vráti chybu, zobrazíme ju
        if (!response.ok) {
            console.error("OpenAI API error:", data);
            return res.status(500).json({ error: data.error?.message || "API error" });
        }

        res.json({ reply: data.choices[0].message.content });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server beží na porte " + port));
