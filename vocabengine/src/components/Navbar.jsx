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
    <nav className="sticky top-2 z-50 mx-auto max-w-6xl px-3 sm:px-4">
      <div
        className="
          flex items-center justify-between
          rounded-2xl sm:rounded-3xl
          border border-white/10
          bg-black/60 backdrop-blur-md
          px-3 sm:px-6
          py-2 sm:py-3
          shadow-lg
        "
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("analyze")}
          className="group flex items-center"
        >
          <img
            src="logoMain.png"
            alt="Vocab Engine"
            className="
              h-[100px] sm:h-[100px] md:h-12 lg:h-14
              w-auto
              transition-transform duration-200
              group-hover:scale-105
            "
          />
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-white/5 p-1">
          {[
            { label: "Analyze", id: "analyze" },
            { label: "Saved", id: "saved" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                rounded-full
                px-3 sm:px-4
                py-1.5 sm:py-2
                text-xs sm:text-sm
                font-medium
                text-gray-300
                transition
                hover:bg-indigo-500/10 hover:text-indigo-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40
              "
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
