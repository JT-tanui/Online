// Positioning note, so nobody re-flattens this later:
//
// He is a software engineer. SafariDesk is where he works, not what he is.
// An earlier version of this file led with "I build the software support teams
// work in all day" and then repeated that same sentence in the hero tagline,
// the hero intro and the About section. Each block below now says something the
// others do not. If you edit one, check it does not restate another.

export const personalInfo = {
  name: "Job Kiprotich Busienei",
  title: "Software Engineer",
  headline: "Backend, desktop, mobile — I build products end to end.",
  seoTitle:
    "Job Kiprotich Busienei — Software Engineer | Python, TypeScript, C# | Nairobi",
  email: "jobtanui21@gmail.com",
  location: "Nairobi, Kenya (UTC+3)",
  phone: "+254 707 696 045",
  avatarUrl: "/images/profile.jpg",
  currentCompany: "SafariDesk",
  themeColor: "#4A76B8",

  // Hero only.
  introduction:
    "Python and TypeScript on the server, C# on the desktop, Dart and Kotlin when it needs to be in someone's pocket. I've shipped multi-tenant web platforms, a Windows application that runs AI models on the user's own GPU, and an Android build signed and packaged for the Play Store.",

  // Footer.
  shortBio:
    "Software engineer in Nairobi. Backend, desktop and mobile.",

  // About only — deliberately different ground from the hero.
  aboutLead:
    "Most of what I build, I build all the way: schema through interface through installer. That tends to mean fewer shortcuts than a demo would need and a lot more time in the parts nobody demos.",

  longIntro: `Over the last two years I have written a five-portal learning platform on Django, a booking product on FastAPI with its own billing and rate limiting, an offline-first field application where a phone with no signal has to reconcile cleanly hours later, and a Windows desktop application in C# that detects personal information in documents, images and video without sending any of it to a server.

  That last one is where I have spent most of this year. Running models locally means ONNX Runtime, DirectML for GPU acceleration, whisper.cpp for speech, and llama.cpp in a separate host process with its own Vulkan build — plus the unglamorous half: code signing, MSIX packaging, Play Store bundles, and the store listings that go with them. Shipping software to a stranger's machine is a different discipline from deploying to a server you control.

  I am at my best on a hard bug. My favourite this year: two NuGet packages shipping competing builds of the same native library to the same output path, which silently forced every AI detector in the application onto the CPU while the startup check reported GPU acceleration as available. I found it in a single line of a field log.

  I work at SafariDesk, a startup in Nairobi, on a Django and React platform and the C# desktop application above. Before engineering full time I spent seven months on the ICT service desk at Kenya Power, which is the reason I read logs before I guess.`,

  education: {
    degree: "Diploma in Computer Programming",
    institution: "The Co-operative University of Kenya",
    period: "2022–2025",
    description:
      "U.S. equivalency: Associate of Science in Computer Programming — 60 semester credits, 3.10 GPA. Evaluated by SpanTran / The Evaluation Company (a NACES member), June 2026."
  },

  experience: {
    position: "Software Engineer",
    company: "SafariDesk",
    period: "March 2025 – Present",
    description:
      "Django and PostgreSQL services, a React and TypeScript frontend, and a C# WPF desktop application with local model inference."
  },

  additionalEducation: [
    {
      degree: "AWS re/Start Graduate",
      institution: "Amazon Web Services",
      period: "January 2025",
      description:
        "Cloud fundamentals, Linux, networking, security, and AWS core services."
    },
    {
      degree: "Software Engineering & Full-Stack Web Development",
      institution: "Power Learn Project",
      period: "January 2025",
      description:
        "Full-stack programme covering JavaScript, databases, and modern web frameworks."
    },
    {
      degree: "Cybersecurity Fundamentals",
      institution: "IBM",
      period: "2024",
      description:
        "Network security, threat analysis, and risk management fundamentals."
    },
    {
      degree: "Software Engineering Job Simulation",
      institution: "Wells Fargo (via Forage)",
      period: "2025",
      description:
        "Virtual work programme implementing features against an existing Java codebase."
    },
    {
      degree: "Front-End Development Certification",
      institution: "freeCodeCamp",
      period: "2024",
      description: "HTML, CSS, JavaScript, and responsive web design."
    },
    {
      degree: "Python Essentials",
      institution: "Cisco Networking Academy",
      period: "2024",
      description: "Python fundamentals, data structures, and scripting."
    }
  ],

  additionalExperience: [
    {
      position: "ICT & Telecommunication Division — Industrial Attachment",
      company: "Kenya Power (KPLC), Nakuru",
      period: "January – July 2024",
      description:
        "Windows and network support across the division: service desk monitoring and resolution-time reporting, LAN/WAN and Cisco equipment, VHF/HF radio systems. Built an internal device check-in and check-out system to replace a paper equipment log."
    }
  ],

  socials: {
    github: "https://github.com/JT-tanui",
    linkedin: "https://linkedin.com/in/job-busienei",
    credly: "https://www.credly.com/users/job-busienei"
  },

  skills: [
    {
      category: "Backend",
      skills: ["Python", "Django", "FastAPI", "NestJS", "PostgreSQL", "REST APIs", "WebSockets"]
    },
    {
      category: "Frontend",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Desktop & mobile",
      skills: ["C#", ".NET", "WPF", "WinUI", ".NET MAUI", "Flutter", "React Native"]
    },
    {
      category: "Systems & AI",
      skills: ["ONNX Runtime", "DirectML", "whisper.cpp", "llama.cpp", "FFmpeg", "pgvector"]
    },
    {
      category: "Platform",
      skills: ["Docker", "nginx", "GitHub Actions", "Linux", "AWS"]
    }
  ],

  timeline: []
};
