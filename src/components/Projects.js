import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Projects.module.css';
import { projects } from '../data/projects';
import AnimatedSection from './AnimatedSection';

const Projects = () => {
  const [isClient, setIsClient] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Extract unique categories from projects
  const allCategories = ['all', ...new Set(projects?.flatMap(project => project.categories || []))];

  useEffect(() => {
    setIsClient(true);
    setFilteredProjects(projects || []);
  }, []);

  const filterProjects = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.categories && project.categories.includes(category)
    );
    
    setFilteredProjects(filtered);
  };

  return (
    <div className={styles.projects}>
      <h2 className={styles.sectionTitle}>My Projects</h2>
      
      {/* Project Filters */}
      <div className={styles.filterContainer}>
        {allCategories.map((category, index) => (
          <button 
            key={index} 
            className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => filterProjects(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className={styles.container}>
        {filteredProjects.map((project, index) => (
          <AnimatedSection 
            key={project.id} 
            className={styles.projectCard}
            delay={index * 0.1}
          >
            <div className={styles.imageContainer}>
              {/* Always show placeholder during SSR or if no image */}
              {(!isClient || !project.image) && (
                <div className={styles.imagePlaceholder}>Project Image</div>
              )}
              
              {/* Show actual image only on client side */}
              {isClient && project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={225}
                  className={styles.projectImage}
                />
              )}
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies?.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.links}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  Live Demo
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  GitHub
                </a>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Projects;