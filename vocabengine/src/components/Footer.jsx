export default function Footer() {
  return (
    <footer className="relative rounded-4xl mt-24 overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-neutral-400">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 items-start">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight mb-4">
              VocabEngine
            </h3>
            <p className="text-sm leading-relaxed max-w-sm text-neutral-400">
              Build vocabulary deliberately. Small words. Daily progress. Master
              language through consistency, not cramming.
            </p>
          </div>

          {/* Motivation / Streak */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-4">
            <p className="text-lg font-bold text-indigo-400">Daily streak</p>
            <p className="text-sm text-neutral-300">
              Keep your learning momentum! Open the app daily and grow your
              streak.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <a
                href="https://github.com/Arsh1333/Vocabengine"
                target="_blank"
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/10"
              >
                <span className="text-neutral-400 group-hover:text-neutral-100 transition-colors">
                  GitHub
                </span>
              </a>
              <a
                href="https://x.com/ArshPawar5"
                target="_blank"
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <span className="text-neutral-400 group-hover:text-neutral-100 transition-colors">
                  X
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-16 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} VocabEngine. All rights reserved.</p>
          <p className="font-medium text-neutral-400">
            Made for learners, not crammers ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
