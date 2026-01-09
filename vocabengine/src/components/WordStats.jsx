export default function WordStats({ wordStats }) {
    if (!wordStats) return null;
    return (
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
)
}