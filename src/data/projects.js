export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, user authentication, and payment integration.",
    longDescription: "This project is a full-stack e-commerce solution built with React, Node.js, and MongoDB. It features a responsive design, product search and filtering, user authentication, shopping cart functionality, and Stripe payment integration. I implemented best practices for accessibility and performance optimization.",
    image: "/images/projects/ecommerce.jpg",
    placeholder: "E-commerce application screenshot showing products grid",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    liveUrl: "https://my-ecommerce-project.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce-project",
    highlights: [
      "Implemented responsive design with mobile-first approach",
      "Reduced load time by 40% through code splitting and lazy loading",
      "Built secure user authentication system with JWT",
    ]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks with features like categories, priorities, and deadline notifications.",
    longDescription: "This task management application helps users organize their work with features such as task categorization, priority setting, deadline notifications, and progress tracking. The app uses React for the frontend, with Redux for state management, and Firebase for the backend services.",
    image: "/images/projects/taskmanager.jpg",
    placeholder: "Task management application showing task list and calendar",
    technologies: ["React", "Redux", "Firebase", "Material UI"],
    liveUrl: "https://task-manager-app.vercel.app",
    githubUrl: "https://github.com/yourusername/task-manager",
    highlights: [
      "Built with React Hooks and Context API for efficient state management",
      "Implemented real-time updates using Firebase",
      "Added offline support with service workers"
    ]
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather application providing current conditions and forecasts with interactive maps and charts.",
    longDescription: "This weather dashboard displays current weather conditions and forecasts for any location, featuring interactive maps, temperature charts, and weather alerts. The app uses OpenWeatherMap API for data, Chart.js for visualizations, and is built with vanilla JavaScript and CSS.",
    image: "/images/projects/weather.jpg",
    placeholder: "Weather dashboard showing temperature charts and forecast",
    technologies: ["JavaScript", "HTML5", "CSS3", "Chart.js", "Weather API"],
    liveUrl: "https://weather-dashboard-app.vercel.app",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    highlights: [
      "Integrated data from multiple weather APIs for comprehensive information",
      "Created responsive, interactive charts for data visualization",
      "Implemented geolocation for automatic local weather"
    ]
  }
];