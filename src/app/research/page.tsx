import Link from "next/link";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">research</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <h2 className="text-lg font-bold text-black">
            hotspot (hybrid oceanic tracking via satellite proxy and optimized time-series)
          </h2>
          <p className="text-gray-400 text-sm">
            studying how remote sensing and time-series modeling can be used to infer nutrient-driven
            ecological changes in marine environments.
          </p>
          <p>
            designed ecological constraint filters and local time-series interpolation to reconstruct
            missing data and enforce physically consistent predictions.
          </p>
          <p>
            focused on reducing false positives and improving reliability so environmental forecasts
            remain usable in real-world monitoring settings.
          </p>
          <p>
            earned the stockholm regional water prize, placed 3rd at regionals, and advanced to the
            state science fair.
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
