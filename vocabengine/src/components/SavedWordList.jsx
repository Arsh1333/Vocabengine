import { useState, useMemo } from "react";
import { getStreaks } from "../utils/streaks";


const XP_PER_WORD = {
  Rare: 5,
  Uncommon: 3,
  Common: 1,
};

const LEVELS = [
  { minXP: 0, title: "Word Seeker" },
  { minXP: 25, title: "Lexical Explorer" },
  { minXP: 75, title: "Vocabulary Curator" },
  { minXP: 150, title: "Language Analyst" },
  { minXP: 300, title: "Wordsmith" },
  { minXP: 500, title: "Lexicon Virtuoso" },
];

export default function SavedWordsList({ savedWords, deleteSavedWord }) {
  const [openIndex, setOpenIndex] = useState(null);

  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [revisionWords, setRevisionWords] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [messageForRevision, setMessageForRevision] = useState("");

  const APP_URL = `https://vocabengine-7pkj.vercel.app/`;

  /* Stats + XP calculation */
  const stats = useMemo(() => {
    const counts = { Rare: 0, Uncommon: 0, Common: 0 };
    let xp = 0;

    savedWords.forEach((word) => {
      if (counts[word.rarity] !== undefined) {
        counts[word.rarity]++;
        xp += XP_PER_WORD[word.rarity] || 0;
      }
    });

    return {
      total: savedWords.length,
      xp,
      ...counts,
    };
  }, [savedWords]);

  /* Determine current level */
  const level = useMemo(() => {
    return [...LEVELS].reverse().find((lvl) => stats.xp >= lvl.minXP);
  }, [stats.xp]);

  /* Next level (for motivation) */
  const nextLevel = useMemo(() => {
    return LEVELS.find((lvl) => lvl.minXP > stats.xp);
  }, [stats.xp]);

  const shareText = useMemo(() => {
    return (
      `I’ve collected ${stats.total} words and reached "${level?.title}" 🧠✨\n` +
      `Building my vocabulary one word at a time.\n\n` +
      `${APP_URL}`
    );
  }, [stats.total, level]);

  const shareOnTwitter = () => {
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const streaks = useMemo(() => {
    return getStreaks(savedWords);
  }, [savedWords]);

  const REVISION_COUNT = 3;
  const startRevision = () => {
    if (savedWords.length < REVISION_COUNT) {
      setMessageForRevision(
        `Save at least ${REVISION_COUNT} words to start revision`,
      );
      setIsRevisionOpen(true);
      setRevisionWords([]);
      return;
    }

    setMessageForRevision("");

    const shuffled = [...savedWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, REVISION_COUNT);

    setRevisionWords(selected);
    setRevealed({});
    setIsRevisionOpen(true);
  };

  return (
    <div id="saved" className="mt-10">
      <h2 className="mb-4 text-xl font-mont text-gray-200">Words collection</h2>

      <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-5">
        <p className="text-sm text-gray-400">You’ve collected</p>

        <div className="mt-1 text-3xl font-semibold text-gray-100">
          {stats.total} words
        </div>

        <div className="mt-1 text-blue-400 font-medium">{level?.title}</div>

        <div className="text-xs text-gray-500">
          {stats.xp} XP
          {nextLevel &&
            ` • ${nextLevel.minXP - stats.xp} XP to ${nextLevel.title}`}
        </div>

        <button
          onClick={shareOnTwitter}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition"
        >
          Share progress on X
        </button>
        <button
          onClick={startRevision}
          // disabled={savedWords.length < 3}
          className={`mt-4 ml-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition
    ${
      savedWords.length < 3
        ? "border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed"
        : "border-gray-600 bg-red-900 text-gray-200 hover:bg-gray-800"
    }
  `}
        >
          Revision
        </button>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-purple-400/10 px-3 py-1 text-purple-300">
            Rare: {stats.Rare}
          </span>
          <span className="rounded-full bg-blue-400/10 px-3 py-1 text-blue-300">
            Uncommon: {stats.Uncommon}
          </span>
          <span className="rounded-full bg-green-400/10 px-3 py-1 text-green-300">
            Common: {stats.Common}
          </span>
        </div>
      </div>

      {isRevisionOpen && (
        <div className="mt-6 rounded-xl border border-indigo-500/30 bg-indigo-900/20 p-5">
          <h3 className="mb-4 text-lg font-semibold text-indigo-300">
            Today’s Revision
          </h3>
          {messageForRevision && (
            <>
              <h1>{messageForRevision}</h1>
            </>
          )}

          <div className="space-y-3">
            {revisionWords.map((item, idx) => (
              <div
                key={item.word}
                className="rounded-lg border border-gray-700 bg-gray-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 font-medium text-lg">
                    {item.word}
                  </span>

                  <button
                    onClick={() =>
                      setRevealed((prev) => ({ ...prev, [idx]: true }))
                    }
                    className="text-xs text-gray-400 hover:text-gray-200"
                  >
                    Reveal
                  </button>
                </div>

                {revealed[idx] && (
                  <p className="mt-2 text-sm text-gray-400">
                    {item.meanings?.[0]?.definitions?.[0]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsRevisionOpen(false)}
            className="mt-4 text-xs text-red-400 hover:text-gray-200"
          >
            Close revision
          </button>
        </div>
      )}

      {savedWords.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 p-6 text-center">
          <p className="text-sm text-gray-400">No saved words yet.</p>
          <p className="mt-1 text-xs text-gray-500">
            Click on any word to save it for future revision.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedWords.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.word}
                className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/60"
              >
                <div className="flex items-center justify-between p-4">
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <h3 className="text-lg font-medium text-indigo-400">
                      {item.word}
                    </h3>

                    <span className="rounded-full bg-green-400/10 px-2.5 py-0.5 text-xs text-green-300">
                      {item.rarity}
                    </span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedWord(item.word);
                      }}
                      className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500 hover:text-white transition"
                    >
                      ✕
                    </button>

                    <span
                      className={`text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ${
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
      )}

      <div className="mt-3 flex gap-3 text-sm">
        <span className="rounded-full bg-orange-400/10 px-3 py-1 text-orange-300">
          {streaks.current} day streak
        </span>
        <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-yellow-300">
          Best: {streaks.best}
        </span>
      </div>
    </div>
  );
}
