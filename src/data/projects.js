// Every project below is one I built or contributed to directly.
// Where a repository is private (employer-owned or pre-release), no link is given
// rather than a link that will not resolve.

export const projects = {
  completed: [
    {
      id: 1,
      title: "SafariDesk — Help Desk & Ticketing Platform",
      description:
        "The software a customer support team lives in: every email, chat and request from customers arrives as a ticket that the team can assign, track and answer in one place.",
      longDescription: `SafariDesk is a help desk and ticketing SaaS — shared inbox, SLA controls, email-to-ticket intake, knowledge base, and a customer portal, shipped both as a hosted product and as a self-hosted Docker deployment.

      I work across both halves. On the Django backend I rebuilt the transactional email system so every message themes itself to the customer's own branding, introduced a single broadcast layer that pushes real-time updates for tickets, tasks and contacts, and added OAuth token refresh for Google and Microsoft mailbox connections. On the React and TypeScript frontend I built the knowledge base and later rebuilt it as a documentation-style help centre, extended the rich text editor with image alignment and resizing, and replaced every native dropdown in the product with a shared component.`,
      image: "",
      accent: "#2F6FB2",
      technologies: [
        "Python",
        "Django",
        "PostgreSQL",
        "TypeScript",
        "React",
        "Vite",
        "Tailwind CSS",
        "WebSockets",
        "Docker"
      ],
      categories: ["saas", "fullstack", "web"],
      features: [
        "Shared inbox with email-to-ticket intake",
        "SLA controls and ticket routing",
        "Knowledge base and public help centre",
        "Customer portal",
        "Real-time updates over WebSockets",
        "Cloud and self-hosted Docker deployment"
      ],
      challenge:
        "Multi-tenancy is unforgiving. A cached workspace left in memory when a user switches between businesses is not a rendering bug — it is one tenant seeing another tenant's data. Getting the cache invalidation and the backend scope checks to agree, on every path including password reset, was the part that needed real care.",
      githubUrl: "",
      liveUrl: "https://safaridesk.io",
      privateRepo: true,
      featured: true,
      date: "2026-06-24"
    },
    {
      id: 2,
      title: "Safe Redact — Desktop Redaction Application",
      description:
        "A Windows application that finds and permanently removes private details — names, addresses, account numbers — from documents, images, audio and video, so files can be handed to a regulator or a customer without leaking anyone's personal data.",
      longDescription: `A C# desktop application built on .NET 10 and WPF, structured in clean layers: contracts, application services, per-media domains, then infrastructure for AI, persistence, storage and platform. There is no HTTP backend — the interface calls C# services directly, which keeps the whole product installable and offline.

      Detection runs locally through ONNX Runtime with DirectML GPU acceleration, using GLiNER named-entity models over text extracted by OCR, plus whisper.cpp for spoken content in audio and video. I am the largest single contributor to the codebase.`,
      image: "",
      accent: "#7A4FB5",
      technologies: [
        "C#",
        ".NET 10",
        "WPF",
        "ONNX Runtime",
        "DirectML",
        "SQLite",
        "EF Core",
        "FFmpeg",
        "whisper.cpp",
        "xUnit"
      ],
      categories: ["desktop", "AI", "enterprise"],
      features: [
        "Redaction across documents, images, audio and video",
        "Local AI entity detection — nothing leaves the machine",
        "OCR-backed text extraction with word-level coverage tracking",
        "Manual canvas editing with page split, merge, rotate and delete",
        "Project workspaces with per-project scoping",
        "Coverage validation before export"
      ],
      challenge:
        "The most interesting bug I have fixed. Two NuGet packages each shipped their own native onnxruntime.dll to the same output path, and the CPU-only build was winning the copy. Every AI detector in the application silently ran on CPU regardless of the hardware — while the startup check cheerfully reported GPU acceleration as available. I traced it from a single exception in a field log to a native dependency conflict, and fixed it by aligning both projects on the same package.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: true,
      date: "2026-08-09"
    },
    {
      id: 3,
      title: "Ellie — Local-First Meeting Notetaker",
      description:
        "Records your meetings, writes the transcript, works out who said what, and produces notes, decisions and action items — entirely on your own machine, with no cloud service and no subscription.",
      longDescription: `A twelve-project C# solution: a Windows desktop application on the Windows App SDK, an Android application built with .NET MAUI, and shared core, audio, transcription, analysis and persistence libraries between them.

      The design constraint was that everything runs locally. Transcription uses a local whisper model; summarisation runs through a llama.cpp host process, with a separate Vulkan build for machines that have a usable GPU. A cloud provider is available as an opt-in fallback rather than a requirement.

      Built and packaged solo: it produces a signed MSIX installer for Windows and a signed APK and Play Store bundle for Android.`,
      image: "",
      accent: "#2E8B72",
      technologies: [
        "C#",
        ".NET",
        "Windows App SDK",
        ".NET MAUI",
        "whisper",
        "llama.cpp",
        "Vulkan",
        "SQLite"
      ],
      categories: ["desktop", "mobile", "AI"],
      features: [
        "Separate microphone and system-audio capture tracks",
        "Crash-recoverable chunked recording",
        "Live transcript, then a slower accuracy pass",
        "Speaker separation",
        "Local summarisation — no paid AI API required",
        "Signed installers for Windows and Android"
      ],
      challenge:
        "Recording a meeting means never losing one. Audio is written in recoverable chunks so a crash halfway through a call costs you nothing, and microphone and system audio are captured as separate tracks so speaker separation has something real to work with. The other hard part was shipping local GPU inference to ordinary Windows machines, which is why the llama host runs as its own process with a separate Vulkan build.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: true,
      date: "2026-07-28"
    },
    {
      id: 4,
      title: "Boval — Booking Platform",
      description:
        "Lets a small business put its own branded booking page online: clients pick a service, book a slot and get an SMS confirmation, while the business tracks customers and revenue from a dashboard.",
      longDescription: `A FastAPI and PostgreSQL backend with a Next.js and React frontend, deployed behind nginx with Docker Compose. Built solo over six months.

      Each business gets its own branded booking page and can embed a booking widget on its own site. Services can be configured as appointments, calls or scheduled events with session management, and the whole thing is metered against subscription plan limits.`,
      image: "",
      accent: "#C2703D",
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "SQLAlchemy",
        "Alembic",
        "Next.js",
        "React",
        "TypeScript",
        "Docker",
        "nginx"
      ],
      categories: ["saas", "fullstack", "web"],
      features: [
        "Branded per-business booking pages and embeddable widget",
        "Appointment, call and event booking modes",
        "Plan limits enforced against billing",
        "Multi-currency pricing by region",
        "IP-aware rate limiting",
        "SMS confirmations and automated database backups"
      ],
      challenge:
        "Going back and fixing the database rather than working around it. Duplicate client records, unindexed foreign keys and unconstrained status columns were all producing symptoms higher up, and it would have been quicker to patch each symptom in application code. Fixing the schema instead was slower and correct.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: true,
      date: "2026-07-27"
    },
    {
      id: 5,
      title: "SOVAS — Learning Platform",
      description:
        "A learning platform where each group gets its own space: students see their courses, teachers manage classes, and an institution's administrators oversee the whole thing.",
      longDescription: `A multi-portal learning management system built around a Django backend with a separate realtime service. Five distinct frontends — public marketing, student, teacher, institution administrator and super administrator — each deployed to its own subdomain behind Caddy with Docker.

      The largest of my personal codebases at roughly 44,000 lines.`,
      image: "",
      accent: "#4A76B8",
      technologies: ["Python", "Django", "React", "TypeScript", "PostgreSQL", "Docker", "Caddy"],
      categories: ["saas", "fullstack", "web", "education"],
      features: [
        "Five separate role-based portals",
        "Institution and multi-tenant structure",
        "Separate realtime service",
        "Per-subdomain deployment behind Caddy"
      ],
      challenge:
        "Five frontends and one backend means the permission model has to be defined once and honoured everywhere. Deciding what belongs to the institution, the teacher and the student — and keeping that consistent across five separately deployed applications — was the design problem worth the time.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: false,
      date: "2026-07-28"
    },
    {
      id: 6,
      title: "SafariDesk CSAT — Customer Satisfaction Surveys",
      description:
        "The survey product that asks customers how a support interaction went, and the public site that sells it.",
      longDescription: `A React and Vite application alongside SafariDesk's ticketing platform. I built the search and discoverability layer end to end — structured metadata, sitemap, robots configuration, privacy policy and terms pages — and handled the migration to the product's new domain, along with a redesign of the marketing and pricing pages.`,
      image: "",
      accent: "#3E9A8F",
      technologies: ["TypeScript", "React", "Vite", "Docker"],
      categories: ["saas", "web"],
      features: [
        "Survey capture tied to support interactions",
        "Marketing, pricing and legal pages",
        "Structured metadata and sitemap",
        "Domain migration"
      ],
      challenge:
        "A domain migration is the kind of change where the interesting work is invisible if you do it right and very visible if you do not — every canonical URL, sitemap entry and metadata tag has to move together or the product loses its search presence.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: false,
      date: "2026-05-02"
    },
    {
      id: 7,
      title: "Device Check-In / Check-Out System",
      description:
        "An internal system built during my attachment at Kenya Power to track which staff member has which piece of equipment, and when it came back.",
      longDescription: `Built for the ICT and Telecommunication Division at Kenya Power, Nakuru, to replace a manual record of equipment loans. Tracks issue and return, who holds what, and the history of each device.`,
      image: "",
      accent: "#8A6D3B",
      technologies: ["C#", ".NET", "SQL"],
      categories: ["desktop", "enterprise"],
      features: [
        "Device issue and return tracking",
        "Per-device history",
        "Role-based access"
      ],
      challenge:
        "The users were my own colleagues on the support desk, which meant I got feedback on the workflow within hours of changing it. It was the first time I built something where the requirements came from watching people work rather than from a specification.",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      date: "2024-06-01"
    }
  ],

  inProgress: [
    {
      id: 8,
      title: "Vision — Proactive Voice Assistant",
      description:
        "An assistant that phones you on a schedule instead of waiting to be opened, remembers what you talked about last time, and follows up.",
      longDescription: `A FastAPI backend with background workers, PostgreSQL with pgvector for conversational memory, Redis, and LiveKit carrying the live voice calls. A Next.js dashboard on the web and a Flutter application on Android, both talking to the same API.`,
      image: "",
      accent: "#5B6ABF",
      technologies: [
        "Python",
        "FastAPI",
        "LiveKit",
        "PostgreSQL",
        "pgvector",
        "Redis",
        "Next.js",
        "Flutter",
        "Dart"
      ],
      categories: ["AI", "mobile", "fullstack"],
      features: [
        "Scheduled outbound voice calls",
        "Conversational memory across sessions",
        "Token-by-token streaming chat",
        "Push notifications via self-hosted ntfy",
        "Web dashboard and Android application"
      ],
      challenge:
        "A redirect that quietly broke the mobile app. The API answered mobile requests with a 307 to add a trailing slash, and the redirect dropped the POST body on the way — so the web client worked perfectly and the Android client failed with no error worth reading. Finding it meant not trusting the obvious suspect.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: false,
      date: "2026-08-09"
    },
    {
      id: 9,
      title: "Multiplayer Board Game Portal",
      description:
        "A party game you play in the same room: the board goes on the TV, everyone joins by scanning a QR code, and your phone becomes your controller.",
      longDescription: `A NestJS API with Socket.IO and Prisma serving a React portal and a real-time Monopoly implementation, arranged as a monorepo behind nginx.

      The interesting part is the dual view: the shared board renders on a large screen while each player's private state — their money, their properties, their turn — renders on their own phone, with the game engine keeping both in step.`,
      image: "",
      accent: "#B5504F",
      technologies: ["TypeScript", "NestJS", "Socket.IO", "Prisma", "React", "Docker", "nginx"],
      categories: ["web", "games", "fullstack"],
      features: [
        "Real-time multiplayer over WebSockets",
        "QR code join flow",
        "Separate TV board view and per-player phone view",
        "Server-side game engine with persistent state"
      ],
      challenge:
        "Keeping one authoritative game state in sync across a television and several phones, where every device shows a different slice of the same truth and a dropped connection cannot be allowed to corrupt the game.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: false,
      date: "2026-07-27"
    },
    {
      id: 10,
      title: "Syvella — Automated Video Pipeline",
      description:
        "Turns a topic into a finished explainer video: it researches the subject, writes a script, narrates it, picks the footage and renders the result.",
      longDescription: `A Node.js pipeline that plans a video from a single topic, generates narration through text-to-speech, scores and selects stock footage for each segment, and renders the final composition programmatically with Remotion, including word-level synchronised captions.`,
      image: "",
      accent: "#8E5A9E",
      technologies: ["JavaScript", "Node.js", "Remotion", "React", "FFmpeg"],
      categories: ["AI", "web"],
      features: [
        "Topic-to-video pipeline",
        "Text-to-speech narration with timestamps",
        "Word-synchronised captions",
        "Programmatic rendering with Remotion",
        "Relevance scoring for stock media selection"
      ],
      challenge:
        "Audio and video drift. Narration length is not known until the speech is generated, so the composition has to be built from real timestamps rather than estimates — which is what pushed the render towards keyframes driven by the actual audio.",
      githubUrl: "",
      liveUrl: "",
      privateRepo: true,
      featured: false,
      date: "2026-02-05"
    }
  ]
};
