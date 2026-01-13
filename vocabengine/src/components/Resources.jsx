export default function Resources() {
  const resources = [
    {
      level: "A1–A2",
      color: "green",
      title: "Beginner Reading",
      description:
        "Simple sentences and everyday vocabulary. Perfect for building confidence.",
      links: [
        {
          label: "British Council – Elementary",
          url: "https://learnenglish.britishcouncil.org/skills/reading/a1-reading",
        },
        {
          label: "British Council – Pre-Intermediate",
          url: "https://learnenglish.britishcouncil.org/skills/reading/a2-reading",
        },
      ],
    },
    {
      level: "B1–B2",
      color: "yellow",
      title: "Intermediate Reading",
      description:
        "Short articles, opinions, and real-world topics with richer vocabulary.",
      links: [
        {
          label: "British Council – Intermediate",
          url: "https://learnenglish.britishcouncil.org/skills/reading/b1-reading",
        },
        {
          label: "British Council – Upper-Intermediate",
          url: "https://learnenglish.britishcouncil.org/skills/reading/b2-reading",
        },
      ],
    },
    {
      level: "C1",
      color: "indigo",
      title: "Advanced Reading",
      description:
        "Long-form texts and nuanced language for advanced learners.",
      links: [
        {
          label: "British Council – Advanced",
          url: "https://learnenglish.britishcouncil.org/skills/reading/c1-reading",
        },
      ],
    },
  ];

  return (
    <section id="resrc" className="scroll-mt-24 font-mont mt-14">
      <h2 className="text-xl font-mont text-gray-200 mb-2">
        Practice Resources
      </h2>

      <br />
      <p className="mb-6 text-sm text-gray-400">
        Not sure what text to analyze? Use real reading material from trusted
        sources. Copy any paragraph and paste it into the engine to discover new
        vocabulary in context.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((res) => (
          <div
            key={res.level}
            className="rounded-xl border border-gray-700 bg-gray-900/60 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium text-indigo-400">
                {res.title}
              </h3>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-gray-300">
                {res.level}
              </span>
            </div>

            <p className="mb-4 text-sm text-gray-400">{res.description}</p>

            <ul className="space-y-2">
              {res.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-indigo-300">
        💡 Tip: Copy a single paragraph, not the whole article. Shorter text
        helps you focus on quality vocabulary instead of quantity.
      </div>
    </section>
  );
}
