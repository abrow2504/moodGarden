// src/components/MoodEntry.tsx
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";


const moodOptions = [
  "Joyful",
  "Melancholy",
  "Anxious",
  "Enraged",
  "Hopeful",
  "Lonely"
];



export default function MoodEntry() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    try {
      await addDoc(collection(db, "moods"), {
        mood: selectedMood,
        note: note || "",
        timestamp: Timestamp.now(),
        userId: user?.uid || "anonymous"
      });
      setSelectedMood("");
      setNote("");
      alert("Mood saved!");
    } catch (err) {
      console.error("Error saving mood:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <h2>🌒 Log Your Mood</h2>

      <div className="mood-options">
        {moodOptions.map((m) => (
          <button
            type="button"
            key={m}
            className={selectedMood === m ? "selected" : ""}
            onClick={() => setSelectedMood(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Add a note (optional)..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit">Plant It 🌱</button>
    </form>
  );
}
