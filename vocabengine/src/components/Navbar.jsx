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
    <nav className="rounded-2xl sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          onClick={() => scrollTo("analyze")}
          className="text-lg font-semibold tracking-tight text-indigo-400 hover:text-indigo-300 transition"
        >
          VE
        </button>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <button
            onClick={() => scrollTo("analyze")}
            className="hover:text-white transition"
          >
            Analyze
          </button>

          <button
            onClick={() => scrollTo("saved")}
            className="hover:text-white transition"
          >
            Saved
          </button>

          <button
            onClick={() => scrollTo("about")}
            className="hover:text-white transition"
          >
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
