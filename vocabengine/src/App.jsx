import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [commonWords, setCommonWords] = useState(null);

  const loadCommonWords = async () => {
    try {
      const res = await fetch("/wordsData/commonWords.txt");
      const text = await res.text();

      const commonWordSet = new Set(
        text
          .split("\n")
          .map((w) => w.trim().toLowerCase())
          .filter(Boolean)
      );

      return commonWordSet;
    } catch (error) {
      console.log("error while loading words file", error);
    }
  };

  useEffect(() => {
    const fetchWords = async () => {
      const set = await loadCommonWords();
      setCommonWords(set);
      console.log("Loaded common words:", set);
    };

    fetchWords();
  }, []);

  return (
    <>
      <div>
        <div className="join">
          <div>
            <label className="input validator join-item">
              <input type="text" placeholder="Enter your text" />
            </label>
          </div>
          <button className="btn btn-neutral join-item ml-4">Extract</button>
        </div>
      </div>
    </>
  );
}

export default App;
