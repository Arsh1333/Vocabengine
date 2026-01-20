export default function About() {
  return (
    <section
      id="about"
      className="scroll font-mont-mt-24 mx-auto max-w-3xl rounded-2xl border border-gray-700 bg-gray-900/60 p-6 sm:p-8"
    >
      <h2 className="mb-3 font-mont text-2xl font-semibold tracking-tight text-gray-100">
        About the app
      </h2>

      <p className="text-sm font-mont leading-relaxed text-gray-400 sm:text-base">
        This app helps you build vocabulary the same way you naturally read.
        Instead of memorizing word lists, you paste real English content and
        interact with unfamiliar words directly.
      </p>

      <div className="my-5 h-px bg-gray-700/60" />

      <ul className="space-y-3 text-sm text-gray-400 sm:text-base">
        <li className="flex gap-3">
          <span className="text-indigo-400">•</span>
          Click on any word to instantly see its meaning and usage
        </li>
        <li className="flex gap-3">
          <span className="text-indigo-400">•</span>
          Understand how often a word appears in real English
        </li>
        <li className="flex gap-3">
          <span className="text-indigo-400">•</span>
          Save words you want to revisit and revise later
        </li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        Designed for learners preparing for exams, improving reading fluency, or
        simply expanding vocabulary through real content.
      </p>
    </section>
  );
}
