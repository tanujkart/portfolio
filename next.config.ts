import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is a stray pnpm-lock.yaml in ~/, so Next was inferring the home
  // directory as the workspace root and warning on every build. Pin it.
  turbopack: {
    root: path.join(__dirname),
  },

  async redirects() {
    return [
      // /research was a real page for months and may be linked from a resume,
      // an application, or a message. Its two entries now live in the projects
      // section, so send the old URL to the better of the two rather than
      // letting it 404. Permanent: the page is not coming back.
      { source: "/research", destination: "/projects/hotspot", permanent: true },
    ];
  },
};

export default nextConfig;
