// src/components/Garden.tsx
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  timestamp: any;
}

export default function Garden() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const q = query(collection(db, "moods"), orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MoodEntry[];
      setEntries(data);
    };

    fetchMoods();
  }, []);

  const moodToPlant = (mood: string) => {
    switch (mood) {
      case "Joyful":
        return "🌼";
      case "Melancholy":
        return "🖤";
      case "Anxious":
        return "🍄";
      case "Enraged":
        return "🔥";
      case "Hopeful":
        return "✨";
      case "Lonely":
        return "🌫️";
      default:
        return "❓";
    }
  };

  return (
    <div className="garden">
      <h2>🌿 Your Mood Garden</h2>
      <div className="grid">
        {entries.map(entry => (
          <div key={entry.id} className="plant-tile" title={entry.note}>
            <span className="plant">{moodToPlant(entry.mood)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
