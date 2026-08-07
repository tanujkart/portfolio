import Link from "next/link";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex min-h-6 items-center text-gray-500 hover:text-black text-sub font-mono transition-colors">
          ← Back
        </Link>

        <h1 className="text-display font-bold mt-8 mb-8">Research</h1>

        <div className="max-w-measure space-y-4 text-body leading-relaxed text-gray-700">
          <h2 className="text-title font-bold text-black">
            HOTSPOT (Hybrid Oceanic Tracking via Satellite Proxy and Optimized Time-series)
          </h2>
          <p className="max-w-measure text-gray-500 text-sub">
            Studying how remote sensing and time-series modeling can be used to infer nutrient-driven
            ecological changes in marine environments.
          </p>
          <p>
            Designed ecological constraint filters and local time-series interpolation to reconstruct
            missing data and enforce physically consistent predictions.
          </p>
          <p>
            Focused on reducing false positives and improving reliability so environmental forecasts
            remain usable in real-world monitoring settings.
          </p>
          <p>
            Earned the Stockholm Regional Water Prize, placed 3rd at regionals, and advanced to the
            state science fair.
          </p>

          <div className="pt-4">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-meta text-gray-500">Read the paper</p>
              <a
                href="/research/hotspot-paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center font-mono text-sub text-gray-500 hover:text-black transition-colors"
              >
                open in new tab ↗
              </a>
            </div>
            <object
              data="/research/hotspot-paper.pdf"
              type="application/pdf"
              className="w-full h-[80vh] border border-black/10 rounded-lg bg-white"
            >
              <p className="p-4 text-sub text-gray-600">
                Your browser can&apos;t display PDFs inline.{" "}
                <a
                  href="/research/hotspot-paper.pdf"
                  className="underline hover:text-black"
                >
                  Download the paper
                </a>
                .
              </p>
            </object>
          </div>

          <div className="h-2" />

          <h2 className="text-title font-bold text-black">AI Interpretability Research: Mechanistic Interpretability</h2>
          <p className="max-w-measure text-gray-500 text-sub">
            Studying how neural networks represent concepts internally using modern interpretability methods.
          </p>
          <p>
            Analyzed feature discovery, probing, activation patching, and weight-based analysis to understand
            how models encode and manipulate information.
          </p>
          <p>
            Focused on representation geometry, sparse feature directions, and toy models that reveal
            mechanisms like superposition and grokking.
          </p>
          <p>
            Synthesized 30+ papers on modern mechanistic interpretability as part of the NCSSM Research in
            Computational Science program.
          </p>
        </div>
      </div>
    </main>
  );
}
