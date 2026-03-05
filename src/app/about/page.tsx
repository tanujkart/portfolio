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
          <p>i&apos;m tanuj :)</p>
          <p>
            i like figuring out how things work — and building them.
          </p>
          <p>
            right now that means ai systems, hardware projects, and research into how neural networks
            represent and compute information.
          </p>
          <p>
            i&apos;m interested in first-principles thinking, going 0 → 1, and how early ideas scale into
            real ventures.
          </p>
          <p className="text-gray-400">durham, nc.</p>
        </div>
      </div>
    </main>
  );
}
