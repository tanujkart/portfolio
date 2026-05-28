import Link from "next/link";

const links = [
  {
    label: "Email",
    href: "mailto:soccertanuj@gmail.com",
    display: "soccertanuj@gmail.com",
    external: false,
  },
  {
    label: "Email",
    href: "mailto:tanuj@unc.edu",
    display: "tanuj@unc.edu",
    external: false,
  },
  {
    label: "Medium",
    href: "https://medium.com/@tkart",
    display: "medium.com/@tkart",
    external: true,
  },
  {
    label: "Substack",
    href: "https://substack.com/@tanujkarthikeyan",
    display: "substack.com/@tanujkarthikeyan",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/tanujkart",
    display: "github.com/tanujkart",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tanujkart/",
    display: "linkedin.com/in/tanujkart",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link
          href="/"
          className="text-gray-400 hover:text-black text-sm font-mono transition-colors"
        >
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">Contact</h1>

        <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
          The best ways to reach me — happy to chat about projects, research,
          ventures, or food.
        </p>

        <ul className="divide-y divide-black/10 border-y border-black/10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors"
              >
                <span className="text-lg font-bold text-black group-hover:underline">
                  {link.label}
                </span>
                <span className="text-[13px] font-mono text-gray-400 group-hover:text-black transition-colors">
                  {link.display}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
