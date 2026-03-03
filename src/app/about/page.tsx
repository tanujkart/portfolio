import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">about</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>i&apos;m tanuj ;)</p>
          <p>
            i build things that turn messy data into something useful.
          </p>
          <p>
            right now that&apos;s ocean forecasting models, ai systems, and hardware
            that helps people remember what matters.
          </p>
          <p>
            i like first-principles thinking, building from scratch, and going 0 → 1.
          </p>
          <p>
            also interested in scaling ventures — how early-stage ideas become real companies.
          </p>
          <p className="text-gray-400">durham, nc.</p>
        </div>
      </div>
    </main>
  );
}
