const Navbar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-4xl border border-white/10 bg-black/60 backdrop-blur-md px-6 py-3 shadow-lg">
        {/* Logo */}
        <button
          onClick={() => scrollTo("analyze")}
          className="group flex items-center gap-2"
        >
          <img
            src="logoMain.png"
            alt="Vocab Engine"
            className="h-[80px] transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-2 rounded-full bg-white/5 p-1">
          {[
            { label: "Analyze", id: "analyze" },
            { label: "Saved", id: "saved" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="rounded-full px-4 py-4 text-sm font-medium text-gray-300 transition
                         hover:bg-indigo-500/10 hover:text-indigo-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
