// src/hooks/useNarration.ts
export async function generateNarration(moods: {
  mood: string;
  note: string;
  timestamp: any;
}[]) {
  const formatted = moods.map((entry) => {
    const date = new Date(entry.timestamp.seconds * 1000).toDateString();
    return `On ${date}, the mood was "${entry.mood}" — ${entry.note || "no note."}`;
  });

  const prompt = `
You are the Garden Oracle. You speak directly to the one who has tended this moody, magical garden.

The user has recorded their moods and notes across the last seven days. Each entry represents an emotional seed — a flower, fungus, or spirit that has grown in their soul-garden.

Using the following log:
${formatted.join("\n")}

Write a poetic, gothic-style message addressed directly to them. Use "you" language — speak to them as if you are delivering a prophecy or mystical reflection. Reference shadows, transformation, moonlight, or nature-- use metaphors and flowery language. Be introspective, elegant, and eerie with a haunting and personal tone. Keep it to 2 paragraphs or less.
`;

const ORACLE_URL = import.meta.env.VITE_ORACLE_URL || "http://localhost:8787";

const res = await fetch(`${ORACLE_URL}/narrate`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  console.log("GPT response:", data);

  if (data.error) {
    throw new Error(data.error.message || "OpenAI API Error");
  }

  return data.choices[0].message.content;
}

