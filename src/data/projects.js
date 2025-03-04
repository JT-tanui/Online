export const projects = [
  {
    id: 1,
    title: "Charge Monitor",
    description: "A Windows and Android application that notifies users when their device battery reaches 98% to prevent overcharging.",
    longDescription: `Charge Monitor helps users extend battery lifespan by providing timely charge notifications. 
    The Windows version is built with C#, while the Android version is developed in Kotlin.`,
    image: "/images/projects/charge-monitor.jpg", 
    technologies: ["C#", ".NET", "Kotlin", "Android SDK"],
    categories: ["desktop", "mobile", "utility"],
    features: [
      "Battery level monitoring",
      "Customizable notification settings",
      "Minimal system resource usage",
      "Simple and intuitive UI",
      "Multi-platform support"
    ],
    liveUrl: "", // No live URL yet
    githubUrl: "https://github.com/JT-tanui/CM---Charge-Monitor",
  },
  {
    id: 2,
    title: "TeleMed - Telemedicine Platform",
    description: "A web-based telemedicine platform that connects patients with doctors for remote consultations.",
    longDescription: `TeleMed allows users to book online consultations, chat with healthcare professionals, and access medical resources. 
    The platform ensures secure and efficient virtual healthcare delivery.`,
    image: "/images/projects/telemed.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    categories: ["web", "healthcare", "fullstack"],
    features: [
      "User authentication and role-based access",
      "Doctor-patient chat system",
      "Appointment booking",
      "Medical record management",
      "Secure payment integration"
    ],
    liveUrl: "", // No live URL yet
    githubUrl: "https://github.com/JT-tanui/telemed",
  },
  {
    id: 3,
    title: "Recipe Manager",
    description: "A Windows application for storing and managing recipes with an easy-to-use interface.",
    longDescription: `This application helps users organize their favorite recipes, categorize them, and quickly access cooking instructions.`,
    image: "/images/projects/recipe-manager.jpg",
    technologies: ["C#", "SQLite", "WinForms/WPF"],
    categories: ["desktop", "productivity"],
    features: [
      "Add, edit, and delete recipes",
      "Search and filter functionality",
      "Categorization and tagging",
      "Offline storage with SQLite",
      "Simple and modern UI"
    ],
    liveUrl: "", // No live URL yet
    githubUrl: "https://github.com/JT-tanui/recipe-manager",
  },
  {
    id: 4,
    title: "Full-Service Provider Website",
    description: "A platform that connects users with service providers for various needs.",
    longDescription: `This project is designed to help people find and hire professionals for services like home repairs, tutoring, and business consulting.`,
    image: "/images/projects/service-provider.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
    categories: ["web", "marketplace", "fullstack"],
    features: [
      "Service provider registration",
      "User reviews and ratings",
      "Search and filter by category",
      "Secure booking system",
      "Mobile-responsive design"
    ],
    liveUrl: "", // No live URL yet
    githubUrl: "https://github.com/JT-tanui/full-service-provider",
  },
  {
    id: 5,
    title: "SwiftX - Transport Service App",
    description: "An Uber-like transport service tailored for urban Africans, focusing on school and group transportation.",
    longDescription: `SwiftX is a ride-booking platform designed to provide safe and reliable transportation for school children and group outings. 
    The app ensures that all drivers meet safety and service standards.`,
    image: "/images/projects/swiftx.jpg",
    technologies: ["React Native", "Firebase", "Node.js"],
    categories: ["mobile", "transport", "fullstack"],
    features: [
      "User and driver authentication",
      "Real-time vehicle tracking",
      "Secure payment integration",
      "Ride scheduling and management",
      "Parent monitoring for school rides"
    ],
    liveUrl: "", // No live URL yet
    githubUrl: "", // No GitHub repo yet
  }
];
