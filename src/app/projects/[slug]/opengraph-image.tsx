import { ImageResponse } from "next/og";
import { categoryOf, formatDateRange, projectBySlug, projects } from "@/data/projects";

// Auto-generated share card, one per project, at build time.
//
// Deliberately no remote font fetch. Pulling a webfont here is the standard
// way next/og fails a Vercel build, and a failed build means the whole site
// doesn't deploy. System sans only.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project card";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const SWATCH: Record<string, string> = {
  fe: "#a855f7",
  be: "#10b981",
  hw: "#f97316",
  ai: "#ec4899",
  sci: "#0ea5e9",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fcfcfc",
            fontSize: 56,
            color: "#1e3a5f",
          }}
        >
          Tanuj Karthikeyan
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfcfc",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 24,
              color: "#6b7280",
            }}
          >
            <span>{formatDateRange(project)}</span>
            {project.status === "active" ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#059669" }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: "#10b981",
                  }}
                />
                active
              </span>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#111827",
              marginTop: 20,
              letterSpacing: "-0.02em",
            }}
          >
            {project.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#4b5563",
              marginTop: 24,
              maxWidth: 940,
            }}
          >
            {project.blurb}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {project.pills.slice(0, 4).map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid #e5e7eb",
                  borderRadius: 999,
                  padding: "10px 20px",
                  fontSize: 22,
                  color: "#374151",
                  background: "#ffffff",
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: SWATCH[categoryOf(pill) ?? ""] ?? "#9ca3af",
                  }}
                />
                {pill}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>
            Tanuj Karthikeyan
          </div>
        </div>
      </div>
    ),
    size,
  );
}
