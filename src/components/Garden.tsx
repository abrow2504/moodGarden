// src/components/Garden.tsx
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  timestamp: any;
}

export default function Garden() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }
    const fetchMoods = async () => {
      setLoading(true);
      const q = query(
        collection(db, "moods"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MoodEntry[];
      setEntries(data);
      setLoading(false);
    };
    fetchMoods();
  }, [user]);

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

  if (loading) {
    return <div className="garden"><h2>🌿 Your Mood Garden</h2><p>Loading...</p></div>;
  }

  if (!user) {
    return <div className="garden"><h2>🌿 Your Mood Garden</h2><p>Please log in to see your moods.</p></div>;
  }

  return (
    <div className="garden">
      <h2>🌿 Your Mood Garden</h2>
      <div className="grid">
        {entries.length === 0 ? (
          <p>No moods found for your account.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="plant-tile" title={entry.note}>
              <span className="plant">{moodToPlant(entry.mood)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
