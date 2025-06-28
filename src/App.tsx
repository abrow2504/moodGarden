import "./App.css";
import MoodEntry from "./components/MoodEntry";
import Garden from "./components/Garden";
import Narration from "./components/Narration";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1> Mood Garden</h1>
        <p className="tagline">Tend to your emotions.</p>
      </header>

      <main>
        <MoodEntry />
        <Garden />
        <Narration />
      </main>

      <footer>
        <p>Crafted with 🌑 and React</p>
      </footer>
    </div>
  );
}

export default App;
