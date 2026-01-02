import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [commonWords, setCommonWords] = useState(null);
  const [inputText, setInputText] = useState("");
  const [uncommonWords, setUncommonWords] = useState([]);

  const meaning = async (word) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      // console.log(res.body.json());
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(
        "Error while getting meaning from meaning from dictionary api",
        error
      );
    }
  };

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

  const extractWord = (text) => {
    let words = [];
    let current = "";
    let textToLowerCase = text.toLowerCase();
    for (let i of textToLowerCase) {
      if (i >= "a" && i <= "z") {
        current += i;
      } else {
        if (current.length > 0) {
          words.push(current);
          current = "";
        }
      }
    }
    return words;
  };

  const findUncommonWords = (text, commonWordSet) => {
    if (!commonWordSet) {
      console.log("common words set not found");
      return;
    }
    const words = extractWord(text);
    const result = new Set();

    for (let i of words) {
      if (!commonWordSet.has(i) && i.length > 2) {
        result.add(i);
      }
    }

    return Array.from(result);
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
              <input
                type="text"
                placeholder="Enter your text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn btn-neutral join-item ml-4"
            onClick={() => {
              const words = findUncommonWords(inputText, commonWords);
              console.log(words);
              setUncommonWords(words);
            }}
          >
            Extract
          </button>
        </div>
        <div className="mt-6">
          {uncommonWords.map((word) => (
            <span
              key={word}
              className="badge text-yellow-100 badge-outline mr-2 mb-2"
            >
              <button
                onClick={() => {
                  meaning(word);
                  console.log("Word clicked");
                }}
              >
                {word}
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
