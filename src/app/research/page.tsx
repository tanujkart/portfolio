import Link from "next/link";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">research</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <h2 className="text-lg font-bold text-black">hotspot</h2>
          <p className="text-gray-400 text-sm">
            forecasting harmful algal blooms using satellite data + ocean nutrient models.
          </p>
          <p>
            built rule-based ecological filters + time-series interpolation.
          </p>
          <p>
            3rd at regionals. moving on to state.
          </p>
          <p>
            always trying to reduce false positives and make environmental prediction actually usable.
          </p>

          <div className="h-2" />

          <h2 className="text-lg font-bold text-black">ai interpretability research: mechanistic interpretability</h2>
          <p className="text-gray-400 text-sm">
            studying how neural networks represent concepts internally using modern interpretability methods.
          </p>
          <p>
            analyzed feature discovery, probing, activation patching, and weight-based analysis to understand
            how models encode and manipulate information.
          </p>
          <p>
            focused on representation geometry, sparse feature directions, and toy models that reveal
            mechanisms like superposition and grokking.
          </p>
          <p>
            synthesized 30+ papers on modern mechanistic interpretability as part of the NCSSM research in
            computational science program.
          </p>
        </div>
      </div>
    </main>
  );
}
