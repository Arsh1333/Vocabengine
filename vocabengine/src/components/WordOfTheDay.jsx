import { useEffect, useState } from "react";

export default function WordOfTheDay() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWord = async () => {
      try {
        setLoading(true);

        // 1. Load dataset
        const res = await fetch("/wordsData/wotd_words.txt");
        const text = await res.text();

        const words = text
          .split("\n")
          .map((w) => w.trim())
          .filter(Boolean);

        // 2. Deterministic index from date
        const index = getWordIndexForToday(words.length);
        const selectedWord = words[index];

        // 3. Fetch meaning
        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
        );
        const data = await dictRes.json();

        const def =
          data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "Definition not found.";

        setWord(selectedWord);
        setDefinition(def);
      } catch (e) {
        console.error("Failed to load Word of the Day" , e);
      } finally {
        setLoading(false);
      }
    };

    loadWord();
  }, []);

  return (
    <div className="mt-10 rounded-xl border border-gray-700 bg-gray-900/60 p-5">
      <h2 className="mb-2 text-lg font-semibold text-indigo-400">
        Word of the Day
      </h2>

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <>
          <p className="text-xl font-medium text-gray-100">{word}</p>
          <p className="mt-2 text-sm text-gray-400">{definition}</p>
        </>
      )}
    </div>
  );
}

function getWordIndexForToday(length) {
  const today = new Date();

  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return seed % length;
}
