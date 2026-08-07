import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is a stray pnpm-lock.yaml in ~/, so Next was inferring the home
  // directory as the workspace root and warning on every build. Pin it.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
