import Link from "next/link";

const awards = [
  "1st inspire award (state)",
  "2nd stockholm junior water prize (regional)",
  "national merit finalist",
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">awards</h1>

        <ul className="space-y-2">
          {awards.map((award) => (
            <li key={award} className="text-[15px] leading-relaxed text-gray-700">
              {award}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
