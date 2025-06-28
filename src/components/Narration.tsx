import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { generateNarration } from "../hooks/useNarration";

interface MoodEntry {
  mood: string;
  note: string;
  timestamp: Timestamp;
}

export default function Narration() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndGenerate = async () => {
      setLoading(true);
      const q = query(collection(db, "moods"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const lastWeek = snapshot.docs
        .map((doc) => doc.data() as MoodEntry)
        .filter((entry) => {
          const date = new Date(entry.timestamp.seconds * 1000);
          const daysAgo = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
          return daysAgo <= 7;
        });

      const summary = await generateNarration(lastWeek);
      setText(summary);
      setLoading(false);
    };

    fetchAndGenerate();
  }, []);

  return (
    <div className="narration-box">
      <h2>📜 Garden Oracle</h2>
      {loading ? <p>Consulting the shadows...</p> : <p>{text}</p>}
    </div>
  );
}
