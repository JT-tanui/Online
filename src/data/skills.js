// Ordered by how much of my actual shipped work uses each one — not by
// self-assessed percentage. Where something is listed, there is a codebase
// behind it.

export const skills = {
  groups: [
    {
      title: "Languages",
      items: [
        { name: "Python", evidence: "SafariDesk backend, SOVAS, Boval, Vision" },
        { name: "TypeScript", evidence: "SafariDesk frontend, CSAT, Boval, game portal" },
        { name: "C#", evidence: "Safe Redact, Ellie desktop and Android" },
        { name: "JavaScript", evidence: "Syvella, earlier web work" },
        { name: "SQL", evidence: "PostgreSQL and SQLite across most projects" },
        { name: "Dart", evidence: "Vision Android application" }
      ]
    },
    {
      title: "Backend & data",
      items: [
        { name: "Django", evidence: "SafariDesk backend, SOVAS" },
        { name: "FastAPI", evidence: "Boval, Vision" },
        { name: "PostgreSQL", evidence: "SafariDesk, Boval, SOVAS, Vision" },
        { name: "REST API design", evidence: "every backend I have worked on" },
        { name: "WebSockets", evidence: "SafariDesk real-time events, game portal" },
        { name: "SQLAlchemy & Alembic", evidence: "Boval, Vision" },
        { name: "Redis", evidence: "Vision background workers and cache" },
        { name: "SQLite & EF Core", evidence: "Safe Redact, Ellie" }
      ]
    },
    {
      title: "Frontend",
      items: [
        { name: "React", evidence: "SafariDesk frontend, CSAT, SOVAS, Boval" },
        { name: "Next.js", evidence: "Boval, SOVAS, this site" },
        { name: "Tailwind CSS", evidence: "SafariDesk frontend" },
        { name: "Vite", evidence: "SafariDesk frontend, CSAT" },
        { name: "Component library work", evidence: "shared form controls across SafariDesk" }
      ]
    },
    {
      title: "Desktop & mobile",
      items: [
        { name: "WPF", evidence: "Safe Redact" },
        { name: ".NET 10 / .NET 8", evidence: "Safe Redact, Ellie" },
        { name: "Windows App SDK", evidence: "Ellie desktop" },
        { name: ".NET MAUI", evidence: "Ellie Android" },
        { name: "Flutter", evidence: "Vision Android application" },
        { name: "MSIX & Play Store packaging", evidence: "Ellie — signed installers for both" }
      ]
    },
    {
      title: "Platform & tooling",
      items: [
        { name: "Docker & Compose", evidence: "SafariDesk, Boval, SOVAS, game portal" },
        { name: "Git", evidence: "daily, across team and solo repositories" },
        { name: "GitHub Actions", evidence: "SafariDesk, Boval, SOVAS" },
        { name: "nginx", evidence: "Boval, game portal" },
        { name: "Linux", evidence: "deployment and AWS re/Start" },
        { name: "AWS", evidence: "AWS re/Start graduate, 2025" }
      ]
    },
    {
      title: "AI & media",
      items: [
        { name: "ONNX Runtime", evidence: "Safe Redact local inference" },
        { name: "LiveKit", evidence: "Vision live voice calls" },
        { name: "whisper / whisper.cpp", evidence: "Safe Redact, Ellie transcription" },
        { name: "FFmpeg", evidence: "Safe Redact, Ellie, Syvella" },
        { name: "pgvector", evidence: "Vision conversational memory" }
      ]
    }
  ],

  practices: [
    "Debugging from logs rather than guesses",
    "Writing tests around behaviour I have broken before",
    "Multi-tenant data isolation",
    "Reading someone else's codebase before changing it",
    "Explaining a technical cause in plain language",
    "Working a support desk — Kenya Power, 2024"
  ]
};
