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
  const [rarity, setRarity] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedWords, setSavedWords] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);

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
      // console.log("common words set not found");
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

  function getRarity(globalCount) {
    if (!globalCount) return "Extremely rare";
    if (globalCount < 100_000) return "Rare";
    if (globalCount < 1_000_000) return "Uncommon";
    if (globalCount < 10_000_000) return "Common";
    return "Very common";
  }

  const handleWordClick = (word) => {
    meaning(word);
    const localCount = wordFrequencyMap?.get(word) || 0;
    const globalCount = unigramMap?.get(word);

    setRarity(getRarity(globalCount));

    setWordStats({
      localCount,
      globalCount,
    });

    setWordMeaning(word);
  };

  const handleSaveWord = () => {
    const existing = JSON.parse(localStorage.getItem("savedWords")) || [];

    const alreadySaved = existing.some((item) => item.word === wordMeaning);

    if (alreadySaved) return;

    const newWord = {
      word: wordMeaning,
      rarity,
      meanings: meaningData.map((item) => ({
        partOfSpeech: item.partOfSpeech,
        definitions: item.definitions.map((d) => d.definition),
      })),
      savedAt: Date.now(),
    };

    localStorage.setItem("savedWords", JSON.stringify([...existing, newWord]));
    setSavedWords((prev) => [...prev, newWord]);

    setSaved(true);
  };

  useEffect(() => {
    const fetchWords = async () => {
      const set = await loadCommonWords();
      const unigram = await loadCsv();
      setCommonWords(set);
      setUnigramMap(unigram);
      // console.log(unigram);
    };
    const stored = JSON.parse(localStorage.getItem("savedWords")) || [];
    setSavedWords(stored);
    fetchWords();
  }, []);

  return (
    <>
      <div>
        <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 rounded-3xl border border-gray-700/60  bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-gray-900/90 p-4 sm:p-5 shadow-xl shadow-black/40 backdrop-blur-xl ">
          {/* Soft hover glow */}
          <div
            className="  pointer-events-none absolute inset-0 rounded-3xl
      bg-gradient-to-r from-indigo-400/10 to-indigo-600/10
      opacity-0 group-hover:opacity-100
      transition-opacity duration-700 "
          />

          {/* Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Paste or type your paragraph here…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="
        w-full rounded-2xl
        bg-gray-800/60
        border border-gray-700
        px-5 py-4
        text-sm sm:text-base
        text-gray-100
        placeholder-gray-400
        backdrop-blur-md
        outline-none
        transition-all duration-300
        focus:bg-gray-800/80
        focus:border-indigo-400/50
        focus:ring-4 focus:ring-indigo-500/25
      "
            />
          </div>

          {/* Button */}
          <button
            onClick={() => {
              const words = findUncommonWords(inputText, commonWords);
              const freqMap = countWordFrequency(inputText);
              setUncommonWords(words);
              setWordFrequencyMap(freqMap);
            }}
            className="
      relative overflow-hidden
      rounded-2xl
      bg-gradient-to-r from-indigo-500 to-indigo-600
      px-6 py-4
      text-sm font-semibold text-white
      shadow-lg shadow-indigo-500/30
      transition-all duration-300
      hover:shadow-xl hover:shadow-indigo-500/40
      hover:-translate-y-0.5
      active:scale-[0.97]
      w-full sm:w-auto
      flex items-center justify-center
    "
          >
            <span className="relative z-10 flex items-center gap-2">
              Extract
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>

            {/* Subtle shimmer */}
            <span
              className="
        pointer-events-none absolute inset-0
        bg-gradient-to-r from-white/10 to-transparent
        opacity-0 hover:opacity-100
        transition-opacity duration-500
      "
            />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {uncommonWords.map((word) => (
            <button
              key={word}
              onClick={() => handleWordClick(word)}
              className="
        group relative
        rounded-full
        border border-gray-700
        bg-gray-900/60
        px-4 py-2
        text-sm font-medium
        text-indigo-300
        backdrop-blur-md
        transition-all duration-300
        hover:border-indigo-400/60
        hover:bg-gray-800/80
        hover:text-indigo-200
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-indigo-500/20
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500/40
      "
            >
              {/* Subtle glow */}
              <span
                className="
          pointer-events-none absolute inset-0 rounded-full
          bg-gradient-to-r from-indigo-500/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
              />

              <span className="relative z-10">{word}</span>
            </button>
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
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-indigo-400">
                      {wordMeaning}
                    </h1>

                    <span className="flex items-center gap-1 rounded-full bg-green-400/10 px-2.5 py-0.5 text-xs text-green-300">
                      {rarity}
                    </span>
                    <button
                      className={`px-2 py-1 rounded text-sm ${
                        saved ? "bg-green-600" : "bg-blue-700"
                      }`}
                      onClick={() => {
                        handleSaveWord();
                      }}
                    >
                      {saved ? "Saved ✓" : "Save"}
                    </button>
                  </div>

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

      {savedWords.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Saved Words
          </h2>

          <div className="space-y-3">
            {savedWords.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.word}
                  className="rounded-xl border border-gray-700 bg-gray-900/60 overflow-hidden"
                >
                  {/* Header */}
                  <button
                    className="flex w-full items-center justify-between p-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-indigo-400">
                        {item.word}
                      </h3>

                      <span className="rounded-full bg-green-400/10 px-2.5 py-0.5 text-xs text-green-300">
                        {item.rarity}
                      </span>
                    </div>

                    <span
                      className={`text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden px-4 pb-4 text-sm text-gray-400">
                      {item.meanings?.[0]?.definitions?.[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
