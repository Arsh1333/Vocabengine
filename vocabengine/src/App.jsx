import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [commonWords, setCommonWords] = useState(null);
  const [inputText, setInputText] = useState("");
  const [uncommonWords, setUncommonWords] = useState([]);
  // const [meaningOfWord, setMeaningOfWord] = useState(false);
  const [meaningData, setMeaningData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wordMeaning, setWordMeaning] = useState("");
  const [unigramMap, setUnigramMap] = useState(null);
  const [wordFrequencyMap, setWordFrequencyMap] = useState(null);
  const [wordStats, setWordStats] = useState(null);

  const meaning = async (word) => {
    try {
      setMeaningData([]);
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      //  console.log(res.body.json());
      const data = await res.json();
      console.log(data);
      // setMeaningOfWord(true);
      setMeaningData(data[0].meanings);
    } catch (error) {
      setMeaningData([]);
      setError(error);
      console.log(
        "Error while getting meaning from meaning from dictionary api",
        error
      );
    } finally {
      setIsLoading(false);
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

  const loadCsv = async () => {
    try {
      const res = await fetch("/wordsData/unigram_freq.csv");
      const text = await res.text();
      const lines = text.split("\n").slice(1);
      const map = new Map();
      for (let line of lines) {
        const [word, count] = line.split(",");
        if (word && count) {
          map.set(word.trim(), Number(count));
        }
      }
      return map;
    } catch (error) {
      console.log(error);
    }
  };

  const countWordFrequency = (text) => {
    const words = extractWord(text);
    const freqMap = new Map();

    for (let word of words) {
      freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }

    return freqMap;
  };

  const handleWordClick = (word) => {
    meaning(word);
    const localCount = wordFrequencyMap?.get(word) || 0;
    const globalCount = unigramMap?.get(word);

    setWordStats({
      localCount,
      globalCount,
    });

    setWordMeaning(word);
  };

  useEffect(() => {
    const fetchWords = async () => {
      const set = await loadCommonWords();
      const unigram = await loadCsv();
      setCommonWords(set);
      setUnigramMap(unigram);
      console.log(unigram);
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
              const freqMap = countWordFrequency(inputText);
              setUncommonWords(words);
              setWordFrequencyMap(freqMap);
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
                className="cursor-pointer"
                onClick={() => {
                  // meaning(word);
                  // setWordMeaning(word);
                  handleWordClick(word);
                }}
              >
                {word}
              </button>
            </span>
          ))}
        </div>
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/60 px-6 py-4">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent"></span>
              <span className="text-sm text-gray-300">Fetching meaning...</span>
            </div>
          </div>
        )}

        {meaningData && (
          <div className="mt-8 space-y-6">
            <div>
              {wordMeaning && (
                <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900/70 px-5 py-4">
                  <h1 className="text-3xl font-semibold tracking-wide text-indigo-400">
                    <span className="text-gray-500">Word:</span> {wordMeaning}
                  </h1>

                  <button
                    className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300 hover:bg-red-500 hover:text-white transition"
                    onClick={() => {
                      setMeaningData([]);
                      setWordMeaning("");
                      setError("");
                      setWordStats(null);
                    }}
                    aria-label="Close meaning"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            {wordStats && (
              <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900/60 p-4 text-sm text-gray-300">
                <p>
                  Appears{" "}
                  <span className="font-semibold text-indigo-400">
                    {wordStats.localCount}
                  </span>{" "}
                  times in this paragraph
                </p>

                {wordStats.globalCount && (
                  <p className="mt-1">
                    Global usage:{" "}
                    <span className="font-semibold">
                      {wordStats.globalCount.toLocaleString()}
                    </span>{" "}
                    occurrences in English
                  </p>
                )}
              </div>
            )}
            {meaningData.map((meaning, meaningIndex) => (
              <div
                key={meaningIndex}
                className="rounded-xl border border-gray-700 bg-gray-900/60 p-5 shadow-sm"
              >
                <h2 className="mb-3 text-lg font-semibold capitalize text-indigo-400">
                  {meaning.partOfSpeech}
                </h2>

                <ul className="space-y-3">
                  {meaning.definitions.map((def, defIndex) => (
                    <li
                      key={defIndex}
                      className="rounded-lg bg-gray-800/70 p-4 text-sm text-gray-200"
                    >
                      <div className="leading-relaxed">
                        <p className="text-xs text-gray-400">Definitions: </p>
                        {def.definition}
                      </div>

                      {def.example && (
                        <p className="mt-2 border-l-2 border-indigo-500 pl-3 text-xs italic text-gray-400">
                          <span className="text-xs text-gray-400">
                            Example:{" "}
                          </span>
                          “{def.example}”
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {error && (
          <div className="mt-8 rounded-xl border border-red-500/50 bg-red-900/20 p-5 text-center">
            <p className="text-red-400 font-medium">
              No definitions found. Please try another word!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
