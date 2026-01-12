import { useState } from "react";

const NAV_ITEMS = [
  { label: "Analyze", id: "analyze" },
  { label: "Saved", id: "saved" },
  { label: "About", id: "about" },
  { label: "Resources", id: "resrc" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <nav className="sticky top-2 z-50 w-full px-3 sm:px-4 lg:px-12 font-mont">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-700/60 bg-black/70 backdrop-blur-xl shadow-xl">
          {/* Top Row */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Logo */}
            <button
              onClick={() => scrollTo("analyze")}
              className="flex items-center gap-3 focus:outline-none"
            >
              <img
                src="logoMain.png"
                alt="Vocab Engine"
                className="h-9 sm:h-10 w-auto"
              />
              <span className="text-base sm:text-lg font-semibold text-indigo-400">
                VocabEngine
              </span>
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              aria-label="Toggle navigation"
            >
              Menu
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden border-t border-gray-700/60 transition-all duration-300 ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col px-4 py-3 gap-2">
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-300 hover:bg-gray-800/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
