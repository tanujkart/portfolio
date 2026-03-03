import Link from "next/link";

const extras = [
  "spikeball > most sports",
  "learning to skate without breaking bones",
  "thrifting > retail",
  "coffee, whiteboards, late-night build sessions",
];

export default function ExtrasPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">extras</h1>

        <ul className="space-y-2">
          {extras.map((item) => (
            <li key={item} className="text-[15px] leading-relaxed text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
