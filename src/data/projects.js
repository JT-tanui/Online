// Every entry is work I built or contributed to directly.
//
// `kind` separates the two honestly:
//   'work'     — my employer's product. I contributed; it is not mine.
//   'personal' — my own project, built outside work.
//
// `stats` are counted, never estimated: lines of code exclude dependencies,
// build output and vendored third-party code; commit counts come from git.
//
// `availability` is stated plainly rather than linking somewhere that 404s.

export const projects = {
  completed: [
    // ---------------------------------------------------------------
    // WORK — SafariDesk. Their product, my contribution.
    // ---------------------------------------------------------------
    {
      id: 1,
      title: "SafariDesk — Help Desk & Ticketing Platform",
      kind: "work",
      employer: "SafariDesk",
      contribution:
        "461 of 2,027 commits across the two repositories — 2nd of 20 contributors on both",
      description:
        "The software a customer support team lives in: every email, chat and request arrives as a ticket the team can assign, track and answer in one place.",
      longDescription: `SafariDesk is my employer's product, not my own — a help desk and ticketing SaaS with a shared inbox, SLA controls, email-to-ticket intake, knowledge base and customer portal, shipped both hosted and as a self-hosted Docker deployment. It is built by a team of twenty; I am one of them, and because it is a small startup that has meant owning large pieces of it.

      On the Django backend I rebuilt the transactional email system so every message renders against the customer's own branding, introduced a single broadcast layer that pushes real-time updates for tickets, tasks and contacts, and added OAuth token refresh for Google and Microsoft mailbox connections. On the React and TypeScript frontend I built the knowledge base and later rebuilt it as a documentation-style help centre, extended the rich text editor, and replaced every native dropdown in the product with a shared component.`,
      image: "",
      accent: "#2F6FB2",
      technologies: [
        "Python", "Django", "PostgreSQL", "TypeScript", "React",
        "Vite", "Tailwind CSS", "WebSockets", "Docker"
      ],
      categories: ["saas", "fullstack", "web"],
      stats: {
        loc: "151,000+ lines across both repositories",
        span: "Jul 2025 – Jun 2026",
        detail: "Backend 61,903 lines / 427 files · Frontend 89,312 lines / 372 files"
      },
      features: [
        "Shared inbox with email-to-ticket intake",
        "SLA controls and ticket routing",
        "Knowledge base and public help centre",
        "Customer portal",
        "Real-time updates over WebSockets",
        "Cloud and self-hosted Docker deployment"
      ],
      challenge:
        "Multi-tenancy is unforgiving. Workspace cache left in memory when a user switches between businesses is not a rendering bug — it is one tenant seeing another tenant's data. Getting the cache invalidation and the backend scope checks to agree on every path, including password reset, was the part that needed real care.",
      githubUrl: "",
      liveUrl: "https://safaridesk.io",
      availability: "private",
      featured: true,
      date: "2026-06-24"
    },
    {
      id: 2,
      title: "Safe Redact — Desktop Redaction Application",
      kind: "work",
      employer: "SafariDesk",
      contribution: "122 of 241 commits — largest single contributor of 7",
      description:
        "A Windows application that finds and permanently removes private details — names, addresses, account numbers — from documents, images, audio and video, so files can go to a regulator or a customer without leaking anyone's personal data.",
      longDescription: `A sibling product at the same company, in a separate repository. C# on .NET 10 with a WPF interface, structured in clean layers: contracts, application services, per-media domains, then infrastructure for AI, persistence, storage and platform. There is no HTTP backend — the interface calls C# services directly, which keeps the product installable and fully offline.

      Detection runs locally through ONNX Runtime with DirectML GPU acceleration, using GLiNER named-entity models over OCR-extracted text, plus whisper.cpp for spoken content in audio and video.`,
      image: "",
      accent: "#7A4FB5",
      technologies: [
        "C#", ".NET 10", "WPF", "ONNX Runtime", "DirectML",
        "SQLite", "EF Core", "FFmpeg", "whisper.cpp", "xUnit"
      ],
      categories: ["desktop", "AI", "enterprise"],
      stats: {
        loc: "94,532 lines · 454 files",
        span: "Jun 2026 – Aug 2026",
        detail: "424 C# files, 28 XAML · 5 xUnit test projects"
      },
      features: [
        "Redaction across documents, images, audio and video",
        "Local AI entity detection — nothing leaves the machine",
        "OCR-backed extraction with word-level coverage tracking",
        "Canvas editing with page split, merge, rotate and delete",
        "Project workspaces with per-project scoping",
        "Coverage validation before export"
      ],
      challenge:
        "The best bug I have fixed. Two NuGet packages each shipped their own native onnxruntime.dll to the same output path, and the CPU-only build was winning the copy. Every AI detector in the application silently ran on CPU regardless of hardware — while the startup check cheerfully reported GPU acceleration as available. I traced it from one exception in a field log to a native dependency conflict and fixed it by aligning both projects on the same package.",
      githubUrl: "",
      liveUrl: "",
      availability: "private",
      featured: true,
      date: "2026-08-09"
    },
    {
      id: 3,
      title: "SafariDesk CSAT — Customer Satisfaction Surveys",
      kind: "work",
      employer: "SafariDesk",
      contribution: "17 of 41 commits",
      description:
        "A self-hosted survey platform that asks customers how a support interaction went — rating scales, multiple choice and open text, shared by link.",
      longDescription: `A survey product alongside SafariDesk's ticketing platform, built with React and a Python backend. I delivered the search and discoverability layer end to end — structured metadata, sitemap, robots configuration, privacy and terms pages — and handled the migration to the product's new domain, along with a redesign of the marketing and pricing pages.`,
      image: "",
      accent: "#3E9A8F",
      technologies: ["React", "Vite", "Python", "Docker"],
      categories: ["saas", "web"],
      stats: { loc: "7,454 lines · 58 files", span: "Feb – May 2026" },
      features: [
        "Four question types: rating, multiple choice, checkbox, open text",
        "Shareable public survey links",
        "Marketing, pricing and legal pages",
        "Structured metadata and sitemap"
      ],
      challenge:
        "A domain migration is invisible when done right and very visible when not — every canonical URL, sitemap entry and metadata tag has to move together or the product loses its search presence.",
      githubUrl: "",
      liveUrl: "",
      availability: "private",
      featured: false,
      date: "2026-05-02"
    },

    // ---------------------------------------------------------------
    // PERSONAL — my own products.
    // ---------------------------------------------------------------
    {
      id: 4,
      title: "SOVAS — Learning Management System",
      kind: "personal",
      description:
        "A learning platform where every group gets its own space: students see their courses, teachers manage classes, and an institution's administrators oversee all of it.",
      longDescription: `My largest personal codebase. A multi-portal learning management system built around a Django backend with a separate realtime service, and five distinct frontends — public marketing, student, teacher, institution administrator and super administrator — each deployed to its own subdomain behind Caddy with Docker.

      The design problem was the permission model: five separately deployed applications sharing one backend, where what belongs to the institution, the teacher and the student has to be defined once and honoured identically everywhere.`,
      image: "",
      accent: "#4A76B8",
      technologies: [
        "Python", "Django", "React", "TypeScript", "PostgreSQL", "Docker", "Caddy"
      ],
      categories: ["saas", "fullstack", "web", "education"],
      stats: { loc: "44,468 lines · 457 files", detail: "199 TSX · 145 Python · 82 JSX" },
      features: [
        "Five separate role-based portals",
        "Institution and multi-tenant structure",
        "Separate realtime service",
        "Per-subdomain deployment behind Caddy",
        "Documented production deployment"
      ],
      challenge:
        "Five frontends and one backend means the permission model must be defined once and honoured everywhere. Keeping institution, teacher and student boundaries consistent across five separately deployed applications was the part worth the time.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: true,
      date: "2026-07-28"
    },
    {
      id: 5,
      title: "YouTube Agent — Multi-Org Video Automation",
      kind: "personal",
      description:
        "Takes a topic and produces a finished, uploaded YouTube video — script, voice, footage, render and publish — for several channels at once, each with its own branding and content calendar.",
      longDescription: `A zero-budget YouTube automation platform. It plans content against a calendar, generates and renders video, uploads it, and reports back on analytics — across multiple organisations, each with its own branding and voice.

      Built as a Python agent system with a Remotion rendering layer and a web frontend. Includes voice benchmarking to compare synthesised narrators against one another rather than picking one blind.`,
      image: "",
      accent: "#C0453F",
      technologies: [
        "Python", "Remotion", "React", "TypeScript", "FFmpeg", "YouTube Data API"
      ],
      categories: ["AI", "automation", "fullstack"],
      stats: { loc: "32,313 lines · 135 files", detail: "107 Python · 18 TSX · agents, services, workflows" },
      features: [
        "Topic prompt to uploaded video, end to end",
        "Multiple organisations with per-org branding",
        "Content calendars and scheduling",
        "Analytics reporting per channel",
        "Voice benchmarking across synthesised narrators"
      ],
      challenge:
        "Running the same pipeline for several channels without their identities bleeding into each other. Branding, voice, calendar and credentials all had to become per-organisation configuration rather than globals, which meant restructuring the pipeline around an org context rather than a single implied channel.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: true,
      date: "2026-07-17"
    },
    {
      id: 6,
      title: "Ellie — Local-First Meeting Notetaker",
      kind: "personal",
      description:
        "Records your meetings, writes the transcript, works out who said what, and produces notes, decisions and action items — entirely on your own machine, with no cloud service and no subscription.",
      longDescription: `A twelve-project C# solution: a Windows desktop application on the Windows App SDK, an Android application built with .NET MAUI, and shared core, audio, transcription, analysis and persistence libraries between them.

      Everything runs locally. Transcription uses a local whisper model; summarisation runs through a llama.cpp host process with a separate Vulkan build for machines with a usable GPU. A cloud provider exists as an opt-in fallback, not a requirement.

      Built and packaged solo, and it ships: a signed MSIX installer for Windows, and a signed APK and Play Store bundle for Android, with store listings prepared for both.`,
      image: "",
      accent: "#2E8B72",
      technologies: [
        "C#", ".NET", "Windows App SDK", ".NET MAUI",
        "whisper", "llama.cpp", "Vulkan", "SQLite"
      ],
      categories: ["desktop", "mobile", "AI"],
      stats: {
        loc: "15,019 lines · 124 files",
        detail: "12 projects · ships signed MSIX, APK and Play Store bundle"
      },
      features: [
        "Separate microphone and system-audio capture tracks",
        "Crash-recoverable chunked recording",
        "Live transcript, then a slower accuracy pass",
        "Speaker separation",
        "Local summarisation — no paid AI API required",
        "Signed installers for Windows and Android"
      ],
      challenge:
        "Recording a meeting means never losing one. Audio is written in recoverable chunks so a crash halfway through a call costs nothing, and microphone and system audio are captured separately so speaker separation has real signal to work with. The other hard part was shipping local GPU inference to ordinary Windows machines — hence the llama host running as its own process with a separate Vulkan build.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: true,
      date: "2026-07-28"
    },
    {
      id: 7,
      title: "Boval — Booking Platform",
      kind: "personal",
      description:
        "Lets a small business put its own branded booking page online: clients pick a service, book a slot and get an SMS confirmation, while the business tracks customers and revenue from a dashboard.",
      longDescription: `A FastAPI and PostgreSQL backend with a Next.js and React frontend, behind nginx with Docker Compose. Built solo over six months.

      Each business gets a branded booking page and can embed a booking widget on its own site. Services can be configured as appointments, calls or scheduled events with session management, and everything is metered against subscription plan limits.`,
      image: "",
      accent: "#C2703D",
      technologies: [
        "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic",
        "Next.js", "React", "TypeScript", "Docker", "nginx"
      ],
      categories: ["saas", "fullstack", "web"],
      stats: { loc: "19,187 lines · 130 files", span: "Feb – Jul 2026", detail: "46 commits, sole author" },
      features: [
        "Branded per-business booking pages and embeddable widget",
        "Appointment, call and event booking modes",
        "Plan limits enforced against billing",
        "Multi-currency pricing by region",
        "IP-aware rate limiting",
        "SMS confirmations and automated database backups"
      ],
      challenge:
        "Going back and fixing the database rather than working around it. Duplicate client records, unindexed foreign keys and unconstrained status columns were all producing symptoms higher up, and patching each symptom in application code would have been quicker. Fixing the schema instead was slower and correct.",
      githubUrl: "",
      liveUrl: "",
      availability: "private",
      featured: true,
      date: "2026-07-27"
    },
    {
      id: 8,
      title: "Nyukiwatch — Apiary Management",
      kind: "personal",
      description:
        "Field software for beekeeping: caretakers log hive check-ins with a photo and a voice note from the apiary, and beekeepers get inspection records back at the office — working even where there is no signal.",
      longDescription: `An offline-first system for managing hives across an apiary, with four roles — owner, apiarist, supervisor and caretaker — each seeing a different slice.

      Caretakers submit quick check-ins (fine / watch / problem) with a photo and optional voice note. Apiarists record full inspections: queen sighted or queen cells present, brood pattern, and the action taken — requeen, split, combine or none. Built on Fastify with PostgreSQL and MinIO for media.`,
      image: "",
      accent: "#B8862B",
      technologies: ["TypeScript", "Fastify", "PostgreSQL", "MinIO", "JOSE", "Zod"],
      categories: ["fullstack", "mobile", "web"],
      stats: { loc: "10,288 lines · 96 files", detail: "72 TS · 18 TSX · 6 SQL migrations" },
      features: [
        "Four roles with separate workflows",
        "Photo and voice-note hive check-ins",
        "Structured inspections: queen, brood pattern, action taken",
        "Offline capture with idempotent sync",
        "Object storage for field media"
      ],
      challenge:
        "Apiaries do not have reliable signal, so the app has to accept work offline and reconcile later without duplicating it. Every submission carries a client idempotency key and a queued timestamp separate from its submission time, so a caretaker can log six hives with no connection and have exactly six records appear when the phone finds a network.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-04-22"
    },
    {
      id: 9,
      title: "SwiftX — Teen Driver Safety & Ride-Hailing",
      kind: "personal",
      description:
        "A ride platform built for families with teen drivers: parents see where the car is and how it is being driven, and can book rides for school runs.",
      longDescription: `A NestJS API serving two React Native Expo applications — one for the teen driver, one for the parent — plus a Next.js administration portal, with shared TypeScript types across all three.`,
      image: "",
      accent: "#3D7EA6",
      technologies: ["TypeScript", "NestJS", "React Native", "Expo", "Next.js"],
      categories: ["mobile", "fullstack", "transport"],
      stats: { loc: "11,652 lines · 151 files", detail: "API, two mobile apps, admin portal" },
      features: [
        "Separate driver and parent applications",
        "Real-time tracking",
        "Ride scheduling",
        "Admin portal",
        "Shared type definitions across all clients"
      ],
      challenge:
        "Three clients and one API means the contract between them is the whole design. Shared TypeScript types across the driver app, parent app and admin portal meant a change to the API surface broke the build rather than breaking a screen at runtime.",
      githubUrl: "",
      liveUrl: "",
      availability: "private",
      featured: false,
      date: "2026-01-28"
    },
    {
      id: 10,
      title: "Multiplayer Board Game Portal",
      kind: "personal",
      description:
        "A party game you play in the same room: the board goes on the TV, everyone joins by scanning a QR code, and your phone becomes your controller.",
      longDescription: `A NestJS API with Socket.IO and Prisma serving a React portal and a real-time Monopoly implementation, arranged as a monorepo behind nginx.

      The interesting part is the dual view — the shared board renders on a large screen while each player's private state renders on their own phone, with the game engine keeping both in step.`,
      image: "",
      accent: "#B5504F",
      technologies: ["TypeScript", "NestJS", "Socket.IO", "Prisma", "React", "Docker", "nginx"],
      categories: ["web", "games", "fullstack"],
      stats: { loc: "6,151 lines · 57 files" },
      features: [
        "Real-time multiplayer over WebSockets",
        "QR code join flow",
        "Separate TV board view and per-player phone view",
        "Server-side game engine with persistent state"
      ],
      challenge:
        "Keeping one authoritative game state in sync across a television and several phones, where every device shows a different slice of the same truth and a dropped connection cannot corrupt the game.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-07-27"
    },
    {
      id: 11,
      title: "Syvella — Automated Explainer Videos",
      kind: "personal",
      description:
        "Turns a topic into a finished explainer video: it researches the subject, writes a script, narrates it, picks the footage and renders the result.",
      longDescription: `A Node.js pipeline that plans a video from a single topic, generates narration through text-to-speech, scores and selects stock footage per segment, and renders the composition programmatically with Remotion, including word-level synchronised captions.`,
      image: "",
      accent: "#8E5A9E",
      technologies: ["JavaScript", "Node.js", "Remotion", "React", "FFmpeg"],
      categories: ["AI", "automation", "web"],
      stats: { loc: "19,242 lines · 125 files", span: "Jan – Feb 2026", detail: "20 commits" },
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
      availability: "private",
      featured: false,
      date: "2026-02-05"
    },
    {
      id: 12,
      title: "MSME Management System",
      kind: "personal",
      description:
        "A back-office system for small businesses: stock, sales, expenses and a dashboard showing where the money actually went.",
      longDescription: `A Flask application covering inventory tracking, sales and expense management, financial reporting, and an analytics dashboard with Excel export. Deployed and publicly reachable.`,
      image: "",
      accent: "#4C8C5A",
      technologies: ["Python", "Flask", "SQLite", "Bootstrap", "Chart.js"],
      categories: ["web", "business", "fullstack"],
      features: [
        "Inventory tracking",
        "Sales and expense management",
        "Financial reporting",
        "Analytics dashboard",
        "Excel export"
      ],
      challenge:
        "Small business owners do not think in database tables. The reporting had to answer the question they actually ask — where did the money go this month — rather than expose the schema through a UI.",
      githubUrl: "https://github.com/JT-tanui/MSME-Management-System",
      liveUrl: "https://msme-management-system.onrender.com/",
      availability: "public",
      featured: false,
      date: "2025-02-05"
    },
    {
      id: 13,
      title: "Device Check-In / Check-Out System",
      kind: "personal",
      description:
        "An internal system built during my attachment at Kenya Power to track which staff member has which piece of equipment, and when it came back.",
      longDescription: `Built for the ICT and Telecommunication Division at Kenya Power, Nakuru, to replace a manual record of equipment loans. Tracks issue and return, who holds what, and the history of each device.`,
      image: "",
      accent: "#8A6D3B",
      technologies: ["PHP", "SQL", "HTML", "CSS"],
      categories: ["web", "enterprise"],
      features: [
        "Device issue and return tracking",
        "Per-device history",
        "Role-based access"
      ],
      challenge:
        "The users were my own colleagues on the support desk, so feedback arrived within hours of any change. It was the first time I built something where the requirements came from watching people work rather than from a specification.",
      githubUrl: "https://github.com/JT-tanui/Stima_checkin_system",
      liveUrl: "",
      availability: "public",
      featured: false,
      date: "2024-06-01"
    },
    {
      id: 14,
      title: "Charge Monitor",
      kind: "personal",
      description:
        "A small Windows and Android utility that tells you to unplug at 98%, so the battery does not sit at full charge all night.",
      longDescription: `A lightweight battery notifier: it watches charge level and power status and raises a notification at the threshold, staying out of the way otherwise. Windows version in C#, Android version separate.`,
      image: "",
      accent: "#6B8E23",
      technologies: ["C#", ".NET", "Android"],
      categories: ["desktop", "mobile", "utility"],
      features: [
        "Battery level monitoring",
        "Configurable notification threshold",
        "Minimal resource usage"
      ],
      challenge:
        "A utility that runs constantly has to cost nothing. The whole design question was how rarely it could afford to poll while still being useful.",
      githubUrl: "https://github.com/JT-tanui/CM---Charge-Monitor",
      liveUrl: "",
      availability: "public",
      featured: false,
      date: "2024-11-07"
    }
  ],

  inProgress: [
    {
      id: 15,
      title: "Vision — Proactive Voice Assistant",
      kind: "personal",
      description:
        "An assistant that phones you on a schedule instead of waiting to be opened, remembers what you talked about last time, and follows up.",
      longDescription: `A FastAPI backend with background workers, PostgreSQL with pgvector for conversational memory, Redis, NATS and LiveKit carrying live voice calls. A Next.js dashboard on the web and a Flutter application on Android, both against the same API.

      The fourth iteration of an idea I have been circling for a while — the earlier three are on disk and are why this one came together quickly.`,
      image: "",
      accent: "#5B6ABF",
      technologies: [
        "Python", "FastAPI", "LiveKit", "PostgreSQL", "pgvector",
        "Redis", "NATS", "Next.js", "Flutter", "Dart"
      ],
      categories: ["AI", "mobile", "fullstack"],
      stats: { loc: "15,018 lines · 190 files", detail: "123 Python · 32 Dart · 27 TSX" },
      features: [
        "Scheduled outbound voice calls",
        "Conversational memory across sessions",
        "Token-by-token streaming chat",
        "Push notifications via self-hosted ntfy",
        "Web dashboard and Android application"
      ],
      challenge:
        "A redirect that quietly broke the mobile app. The API answered mobile requests with a 307 to add a trailing slash, and the redirect dropped the POST body on the way — so the web client worked perfectly and the Android client failed with nothing useful in the logs. Finding it meant not trusting the obvious suspect.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: true,
      date: "2026-08-09"
    },
    {
      id: 16,
      title: "Explainer Video Generator",
      kind: "personal",
      description:
        "A faceless-video pipeline aimed at explainers about money, negotiation, markets and behaviour — mechanism-driven rather than motivational.",
      longDescription: `A Python pipeline for high-retention explainer videos with a deliberate editorial line: explain the mechanism rather than quote a motivational line. Includes scripting, narration, composition and render, with a Remotion layer for the visual side.`,
      image: "",
      accent: "#A6603C",
      technologies: ["Python", "Remotion", "React", "FFmpeg"],
      categories: ["AI", "automation"],
      stats: { loc: "24,955 lines · 34 files" },
      features: [
        "Explainer-first scripting, not quote-driven",
        "Narration and composition pipeline",
        "Remotion rendering layer"
      ],
      challenge:
        "Writing a generator with a point of view. The constraint that every video must explain a mechanism rather than assert a claim had to be encoded in the prompting and the script structure, not left to chance.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-04-07"
    },
    {
      id: 17,
      title: "Agentic Personal Assistant",
      kind: "personal",
      description:
        "A voice-first assistant meant to run a home and a small business, not just answer questions — built to work with local models.",
      longDescription: `A multi-agent platform with a Python backend and a React frontend, designed around local speech-to-text via Whisper and local models through Ollama, with Temporal for durable workflows.`,
      image: "",
      accent: "#5E7C8B",
      technologies: ["Python", "React", "TypeScript", "Whisper", "Ollama", "Temporal"],
      categories: ["AI", "fullstack"],
      stats: { loc: "17,276 lines · 144 files" },
      features: [
        "Voice-first interaction",
        "Multi-agent task routing",
        "Local model support",
        "Durable workflow execution"
      ],
      challenge:
        "Long-running assistant tasks cannot live in a request handler. Moving them onto durable workflows meant an interrupted task could resume rather than vanish, which is the difference between a demo and something you would rely on.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-01-19"
    },
    {
      id: 18,
      title: "SWE — Sprint-Based AI Software House",
      kind: "personal",
      description:
        "An experiment in running a whole software team as agents: a sprint is planned, work is split, and the output is reviewed before it lands.",
      longDescription: `A Python system that models a software house as a set of cooperating agents working in sprints, rather than a single agent answering a prompt.`,
      image: "",
      accent: "#7A6FA8",
      technologies: ["Python", "SQL", "OpenAI API"],
      categories: ["AI", "automation"],
      stats: { loc: "15,617 lines · 79 files" },
      features: [
        "Sprint planning and task breakdown",
        "Role-separated agents",
        "Review step before work is accepted"
      ],
      challenge:
        "Agents are happy to declare success. Most of the design went into the review step — deciding what evidence counts as a task being genuinely done rather than reported done.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-02-03"
    },
    {
      id: 19,
      title: "ASIZ — Document Intelligence & Consultation",
      kind: "personal",
      description:
        "Reads dense professional documents — legal, financial, medical — classifies what it is looking at, and lets you talk through it by voice.",
      longDescription: `A FastAPI backend with a React Native and Expo mobile client. OCR ingestion through PaddleOCR, automatic sector classification, a multi-agent chat layer, and real-time voice consultation over LiveKit.`,
      image: "",
      accent: "#8C7A4A",
      technologies: ["Python", "FastAPI", "React Native", "Expo", "PaddleOCR", "LiveKit"],
      categories: ["AI", "mobile"],
      stats: { loc: "9,919 lines · 64 files" },
      features: [
        "OCR document ingestion",
        "Automatic sector classification",
        "Multi-agent chat with personas",
        "Real-time voice consultation"
      ],
      challenge:
        "Classifying a document before you know what it is. Sector detection had to run early enough to route the document to the right handling, but with only OCR text and no reliable structure to lean on.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2026-02-03"
    },
    {
      id: 20,
      title: "Ambient Scenery Video Generator",
      kind: "personal",
      description:
        "Builds hour-long ambient scenery videos from a topic, with the footage, the soundscape and the metadata all assembled automatically.",
      longDescription: `A Python pipeline that pulls scenic footage and images from stock sources, falls back to generated images when nothing suitable exists, produces ambient audio, and compiles 20–40 unique scenes per topic with FFmpeg.`,
      image: "",
      accent: "#4F7A6A",
      technologies: ["Python", "FFmpeg", "Pexels API", "Pixabay API"],
      categories: ["AI", "automation"],
      stats: { loc: "2,175 lines · 17 files" },
      features: [
        "20–40 unique scenes per topic",
        "Layered asset fallback: video, then image, then generated",
        "Ambient audio generation",
        "SEO metadata output"
      ],
      challenge:
        "An hour of video from finite stock footage means repetition is the enemy. The fallback chain exists so a scene never fails outright — it degrades from real footage to a still to a generated image rather than leaving a gap.",
      githubUrl: "",
      liveUrl: "",
      availability: "local",
      featured: false,
      date: "2025-12-27"
    }
  ]
};
