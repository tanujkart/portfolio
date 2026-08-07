import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects — Tanuj Karthikeyan",
  description:
    "Smart glasses for memory care, a granted pedestrian-detection patent, a Congressional App Challenge winner, and a dozen other things I've built.",
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
