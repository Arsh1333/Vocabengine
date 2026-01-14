export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center font-mont">
      <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
        Build vocabulary the way you actually read.
      </h1>

      <p className="mt-4 text-base text-gray-400 sm:text-lg">
        Paste any text. Click on words you don’t know.{" "}
        <br className="hidden sm:block" />
        Understand them , save them, and remember them.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
          <h3 className="mb-2 font-semibold text-indigo-400">
            1. Paste real content
          </h3>
          <p className="text-sm text-gray-400">
            Articles, essays, exam passages, or anything you’re reading.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
          <h3 className="mb-2 font-semibold text-indigo-400">
            2. Click unfamiliar words
          </h3>
          <p className="text-sm text-gray-400">
            Instantly see meanings, usage frequency, and context-based insights.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
          <h3 className="mb-2 font-semibold text-indigo-400">
            3. Save & revisit
          </h3>
          <p className="text-sm text-gray-400">
            Build a personal vocabulary list from what you actually encounter.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-gray-700 bg-gray-900/60 p-6 text-left">
        <h3 className="mb-3 font-semibold text-gray-200">Why this works</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Learn words in context, not isolation</li>
          <li>• No memorization pressure — learning feels natural</li>
          <li>• Your saved words reflect your real reading habits</li>
        </ul>
      </div>
    </section>
  );
}
