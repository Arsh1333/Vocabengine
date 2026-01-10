import { useState } from "react";

export default function SavedWordsList({ savedWords, deleteSavedWord }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div id="saved" className="mt-10">
      <h2 className="mb-4 text-xl font-semibold text-gray-200">Saved Words</h2>

      {savedWords.length === 0 ? (
        /* Empty state */
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 p-6 text-center">
          <p className="text-sm text-gray-400">No saved words yet.</p>
          <p className="mt-1 text-xs text-gray-500">
            Click on any word to save it for future revision.
          </p>
        </div>
      ) : (
        /* List */
        <div className="space-y-3">
          {savedWords.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.word}
                className="rounded-xl border border-gray-700 bg-gray-900/60 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  {/* Toggle */}
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

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedWord(item.word);
                      }}
                      className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500 hover:text-white transition"
                      aria-label="Delete saved word"
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
      )}
    </div>
  );
}
