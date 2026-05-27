import Link from "next/link";

export default function ExtrasPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">Extras</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>
            Life goals (as of March 26): run a marathon, get a summer job, write every day.
          </p>
          <p>Learning to: draw, skateboard, play the guitar, line dance, and Italian.</p>
          <p>
            After I retire, I want to be a food critic so I&apos;ve started practicing my writing on{" "}
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
            .
          </p>
        </div>
      </div>
    </main>
  );
}
