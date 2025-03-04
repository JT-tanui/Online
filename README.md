# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js to showcase my projects, skills, and professional experience.

![Portfolio Screenshot](public/images/portfolio-screenshot.png)

## 🌐 Live Demo

[View the live site](https://your-portfolio-url.netlify.app)

## ✨ Features

- Responsive design that works on all devices
- Dark/light mode toggle
- Interactive skill visualizations with radar charts
- Filterable projects by category
- Client testimonials section
- Contact form with validation
- SEO optimized
- Smooth scrolling and animations
- Optimized performance

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: CSS Modules
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 📦 Project Structure

```
portfolio/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Projects.js
│   │   ├── SEO.js
│   │   ├── Skills.js
│   │   ├── SkillRadarChart.js
│   │   └── Testimonials.js
│   ├── data/
│   │   ├── personalInfo.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── index.js
│   └── styles/
│       ├── globals.css
│       └── [Component].module.css files
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🔍 SEO Optimization

This portfolio includes:
- Meta tags for better search engine indexing
- Open Graph tags for social media sharing
- Structured data for better Google search results
- Proper semantic HTML

## 📱 Responsive Design

The portfolio is fully responsive and works on:
- Mobile phones
- Tablets
- Desktops
- Large screens

## ⚙️ Customization

### Updating Personal Information

Edit the data files in data folder:
- `personalInfo.js` - Your name, title, about text, etc.
- `projects.js` - Your projects and their details
- `skills.js` - Your skills and proficiency levels

### Changing Colors and Theme

Edit the CSS variables in globals.css

## 📝 License

MIT License

## 🤝 Acknowledgements

- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- [Google Fonts](https://fonts.google.com/) for typography
- All my clients and colleagues who provided testimonials

Similar code found with 1 license type