// Where to reach Tanuj. Rendered as icons by src/components/SocialLinks.tsx.
//
// Replaced the /contact page, which listed the same destinations as a table of
// label + URL. Nobody reads a URL they are about to click.

export type SocialKey = "email" | "github" | "linkedin" | "medium";

export type SocialLink = {
  key: SocialKey;
  /** Used as the accessible name and the hover tooltip. */
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { key: "email", label: "Email — soccertanuj@gmail.com", href: "mailto:soccertanuj@gmail.com" },
  { key: "github", label: "GitHub — @tanujkart", href: "https://github.com/tanujkart" },
  { key: "linkedin", label: "LinkedIn — /in/tanujkart", href: "https://www.linkedin.com/in/tanujkart" },
  { key: "medium", label: "Medium — @tkart", href: "https://medium.com/@tkart" },
];
