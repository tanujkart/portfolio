import Link from "next/link";

const awards = [
  "1st innovate award — worlds",
  "3× world championship qualifier",
  "",
  "3rd place — regional science fair (environmental science)",
  "2nd stockholm junior water prize (regional)",
  "",
  "stanford invitational champion",
  "georgetown tournament champion",
  "2x nationals qualifier",
  "",
  "national merit finalist",
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">awards</h1>

        <ul className="space-y-1.5">
          {awards.map((award, i) =>
            award === "" ? (
              <li key={i} className="h-4" />
            ) : (
              <li key={i} className="text-[15px] leading-relaxed text-gray-700">
                {award}
              </li>
            )
          )}
        </ul>
      </div>
    </main>
  );
}
