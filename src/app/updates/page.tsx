import Link from "next/link";

type Update = {
  date: string;
  entries: { label: string; content: React.ReactNode }[];
};

const updates: Update[] = [
  {
    date: "May '26",
    entries: [
      {
        label: "goals",
        content: "run a sub 6 mile, start swimming weekly once",
      },
      {
        label: "learning to",
        content: "wood work, use Claude Code",
      },
      {
        label: "in progress",
        content: "running, eating healthy, Italian",
      },
    ],
  },
  {
    date: "March '26",
    entries: [
      {
        label: "goals",
        content: "run a marathon, get a summer job, write every day",
      },
      {
        label: "learning to",
        content: "draw, skateboard, play the guitar, line dance, Italian",
      },
      {
        label: "in progress",
        content: (
          <>
            practicing writing on{" "}
            <a
              href="https://medium.com/@tkart"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Medium
            </a>{" "}
            and{" "}
            <a
              href="https://substack.com/@tanujkarthikeyan"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Substack
            </a>
            , so I can be a food critic when I retire
          </>
        ),
      },
    ],
  },
];

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link
          href="/"
          className="text-gray-400 hover:text-black text-sm font-mono transition-colors"
        >
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">Updates</h1>

        <div className="space-y-12">
          {updates.map((update) => (
            <section key={update.date}>
              <h2 className="text-lg font-bold text-black mb-4">
                {update.date}
              </h2>
              <dl className="space-y-2 text-[15px] leading-relaxed text-gray-700">
                {update.entries.map((entry) => (
                  <div key={entry.label}>
                    <span className="font-mono text-sm text-gray-500">
                      {entry.label}:
                    </span>{" "}
                    {entry.content}
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
