import Link from "next/link";

export default function ExtrasPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">extras</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>
            life goals (as of march 26): run a marathon, get a summer job, write every day
          </p>
          <p>learning to: draw, skateboard, play the guitar, line dance, and italian</p>
          <p>
            after i retire, i want to be a food critic so i&apos;ve started practicing my writing on{" "}
            <a
              href="https://medium.com/@tkart"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              medium
            </a>{" "}
            and{" "}
            <a
              href="https://substack.com/@tanujkarthikeyan"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              substack
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
