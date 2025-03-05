export const projects = {
  completed: [
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
      githubUrl: "https://github.com/JT-tanui/CM---Charge-Monitor",
      liveUrl: "",
      featured: false,
      date: "2023-08-15"
    },
    {
      id: 2,
      title: "Device Check-In/Out System (Kenya Power)",
      description: "A system to track device loans and returns within an organization.",
      longDescription: `Developed for Kenya Power, this system ensures efficient tracking and management of organizational devices.`,
      image: "/images/projects/device-check.jpg",
      technologies: ["C#", "SQL Server", ".NET"],
      categories: ["enterprise", "utility"],
      features: [
        "Device check-in and check-out tracking",
        "User authentication and role-based access",
        "Audit logs for tracking device history"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      date: "2023-12-10"
    },
    {
      id: 3,
      title: "Point of Sale (POS) System",
      description: "A POS system for managing sales, inventory, and transactions.",
      longDescription: `A POS solution designed for small businesses to manage sales transactions and inventory seamlessly.`,
      image: "/images/projects/pos-system.jpg",
      technologies: ["C#", ".NET", "SQL Server"],
      categories: ["desktop", "business"],
      features: [
        "Sales transaction management",
        "Inventory tracking",
        "Customer management",
        "Receipt printing"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      date: "2024-01-25" // Setting as more recent to make it appear as "latest"
    },
    {
      id: 4,
      title: "Image Recognition Small App",
      description: "A lightweight application that detects objects, text, or patterns using image recognition technology.",
      longDescription: `A small-scale AI-powered tool for recognizing and classifying images using OpenCV and TensorFlow.`,
      image: "/images/projects/image-recognition.jpg",
      technologies: ["Python", "OpenCV", "TensorFlow"],
      categories: ["AI", "desktop", "utility"],
      features: [
        "Real-time object detection",
        "Image classification",
        "Basic ML model integration"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      date: "2023-07-20"
    },
    {
      id: 5,
      title: "Corporate Marketing Website",
      description: "A professional website designed for corporate marketing and brand visibility.",
      longDescription: `A fully responsive and SEO-optimized corporate website that enhances online presence for businesses.`,
      image: "/images/projects/corporate-website.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      categories: ["web", "marketing"],
      features: [
        "SEO optimization",
        "Customizable landing pages",
        "Contact and lead generation forms"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      date: "2023-09-05"
    },
    {
      id: 6,
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
      githubUrl: "https://github.com/JT-tanui/telemed",
      liveUrl: "https://telemedicine-platform.netlify.app", // Example live URL
      featured: false,
      date: "2023-10-15"
    },
    {
      id: 7,
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
      githubUrl: "https://github.com/JT-tanui/full-service-provider",
      liveUrl: "",
      featured: false,
      date: "2023-11-20"
    }
  ],
  inProgress: [
    {
      id: 8,
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
      githubUrl: "",
      liveUrl: "", // Add empty liveUrl field
      featured: true,
      date: "2024-02-15" // Most recent to show as latest
    },
    {
      id: 9,
      title: "Appointment Scheduling System",
      description: "A system for booking and managing appointments.",
      longDescription: `A booking platform for businesses and professionals to manage client appointments efficiently.`,
      image: "/images/projects/appointment-scheduler.jpg",
      technologies: ["Node.js", "React", "MongoDB"],
      categories: ["web", "business"],
      features: [
        "Automated scheduling",
        "Calendar synchronization",
        "User notifications and reminders"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      date: "2024-01-05"
    },
    {
      id: 10,
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
      githubUrl: "https://github.com/JT-tanui/recipe-manager",
      liveUrl: "",
      featured: false,
      date: "2023-12-20"
    },
    {
      id: 11,
      title: "Coding Assistant AI",
      description: "An AI-powered tool that helps developers write better code through suggestions and optimizations.",
      longDescription: `A development assistant that uses machine learning to provide code recommendations, identify potential bugs, and suggest optimizations for various programming languages.`,
      image: "/images/projects/coding-assistant.jpg",
      technologies: ["Python", "TensorFlow", "NLP", "JavaScript"],
      categories: ["AI", "developer tools", "productivity"],
      features: [
        "Smart code completion",
        "Bug detection and fixes",
        "Code optimization recommendations",
        "Multi-language support",
        "IDE integration"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      date: "2024-02-01" // Recent to show as latest
    }
  ]
};
