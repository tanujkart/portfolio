import Link from "next/link";

const sections = [
  {
    title: "robotics",
    items: [
      "innovate award — world champion",
      "2x inspire award — state champion",
      "impact award — state champion",
      "3x world championship qualifier",
    ],
  },
  {
    title: "debate",
    items: [
      "champion — stanford invitational",
      "champion — georgetown tournament",
      "2x nationals qualifier",
    ],
  },
  {
    title: "technology / research",
    items: [
      "congressional app challenge grand champion",
      "most innovative product — ncssm entrepreneurship fair (runner-up)",
      "stockholm junior water prize (regional winner)",
    ],
  },
  {
    title: "business",
    items: ["fbla nationals qualifier", "4x fbla state finalist"],
  },
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">awards</h1>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-black">{section.title}</h2>
              <ul className="mt-2 space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
