import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import styles from '../styles/Projects.module.css';
import AnimatedSection from './AnimatedSection';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('latest'); // Default to latest
  const [expandedProject, setExpandedProject] = useState(null);
  const [showAllLatest, setShowAllLatest] = useState(false);

  // Combine and sort projects to show featured/latest first
  const allProjects = [
    ...projects.completed.map(project => ({...project, status: 'completed'})),
    ...projects.inProgress.map(project => ({...project, status: 'inProgress'}))
  ].sort((a, b) => {
    // Sort by featured first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then sort by date (newest first)
    return new Date(b.date) - new Date(a.date);
  });

  const latestProjects = allProjects.filter(project => 
    project.featured || 
    project.title.includes("SwiftX") || 
    project.title.includes("Coding Assistant") || 
    project.title.includes("Point of Sale")
  );

  // Normalize project categories to handle AI case consistently
  const normalizeProjects = (projects) => {
    return projects.map(project => ({
      ...project,
      categories: project.categories.map(cat => 
        cat.toLowerCase() === 'ai' ? 'AI' : cat
      )
    }));
  };

  const normalizedAllProjects = normalizeProjects(allProjects);
  const normalizedLatestProjects = normalizeProjects(latestProjects);

  useEffect(() => {
    // Initial load - set projects 
    if (activeTab === 'all') {
      filterProjects(filter);
    } else if (activeTab === 'latest') {
      // If in latest mode and not showing all, limit to 3 projects
      const filteredLatest = filterProjectsByCategory(normalizedLatestProjects, filter);
      setVisibleProjects(showAllLatest ? filteredLatest : filteredLatest.slice(0, 3));
    } else if (activeTab === 'completed') {
      setVisibleProjects(filterProjectsByCategory(
        projects.completed.map(project => ({...project, status: 'completed'})), 
        filter
      ));
    } else if (activeTab === 'inProgress') {
      setVisibleProjects(filterProjectsByCategory(
        projects.inProgress.map(project => ({...project, status: 'inProgress'})), 
        filter
      ));
    }
  }, [filter, activeTab, showAllLatest]);

  const filterProjects = (category) => {
    if (category === 'all') {
      setVisibleProjects(normalizedAllProjects);
    } else {
      const categoryLower = category.toLowerCase();
      setVisibleProjects(
        normalizedAllProjects.filter(project => 
          project.categories.some(cat => cat.toLowerCase() === categoryLower)
        )
      );
    }
  };

  const filterProjectsByCategory = (projectList, category) => {
    const normalizedList = normalizeProjects(projectList);
    if (category === 'all') {
      return normalizedList;
    }
    const categoryLower = category.toLowerCase();
    return normalizedList.filter(project => 
      project.categories.some(cat => cat.toLowerCase() === categoryLower)
    );
  };

  // Updated function to handle the tab change

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedProject(null);
    setShowAllLatest(false);
    setFilter('all'); // Reset filter when changing tabs
  };

  // Get unique categories from all projects with proper case handling
  const categories = React.useMemo(() => {
    return ['all', ...new Set(
      allProjects.flatMap(project => 
        project.categories.map(cat => cat.toLowerCase())
      )
    )].sort().map(cat => cat === 'ai' ? 'AI' : cat.charAt(0).toUpperCase() + cat.slice(1));
  }, [allProjects]); // Only recalculate when projects change

  const toggleProject = (id, event) => {
    // Prevent triggering when clicking on links
    if (event.target.tagName === 'A' || 
        event.target.parentElement.tagName === 'A' ||
        event.target.tagName === 'I') {
      return;
    }
    
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <AnimatedSection className={styles.projects} id="projects">
      {/* Banner */}
      <div className={styles.projectsBanner}>
        <div className={styles.bannerContennt}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
        </div>
      </div>
      
      {/* Modern tab navigation - completely redesigned */}
      <div className={styles.tabContainer}>
        <div className={styles.tabsWrapper}>
          <div className={`${styles.tabIndicator} ${styles[activeTab]}`}></div>
          <button 
            className={`${styles.tabOption} ${activeTab === 'latest' ? styles.active : ''}`}
            onClick={() => handleTabChange('latest')}
            aria-label="Latest projects"
          >
            <i className="fas fa-star"></i> Latest
          </button>
          <button 
            className={`${styles.tabOption} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => handleTabChange('all')}
            aria-label="All projects"
          >
            <i className="fas fa-th-large"></i> All
          </button>
          <button 
            className={`${styles.tabOption} ${activeTab === 'completed' ? styles.active : ''}`}
            onClick={() => handleTabChange('completed')}
            aria-label="Completed projects"
          >
            <i className="fas fa-check-circle"></i> Completed
          </button>
          <button 
            className={`${styles.tabOption} ${activeTab === 'inProgress' ? styles.active : ''}`}
            onClick={() => handleTabChange('inProgress')}
            aria-label="In-progress projects"
          >
            <i className="fas fa-code-branch"></i> In Progress
          </button>
        </div>
      </div>
      
      {/* Filter section - improved layout */}
      <div className={styles.filterContainer}>
        <div className={styles.filterLabel}>Filter by:</div>
        <div className={styles.filterButtons}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.filterButton} ${filter === category.toLowerCase() ? styles.active : ''}`}
              onClick={() => setFilter(category.toLowerCase())}
              data-category={category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.projectsGrid}>
        {visibleProjects.map(project => (
          <div 
            key={project.id} 
            className={`${styles.projectCard} ${expandedProject === project.id ? styles.expanded : ''}`}
            onClick={(e) => toggleProject(project.id, e)}
          >
            <div className={styles.projectImageContainer}>
              <div className={styles.projectImage}
                style={{ backgroundImage: `url(${project.image})` }}>
              </div>
              {project.status === 'inProgress' && (
                <div className={styles.statusBadge} aria-label="Project in progress">In Progress</div>
              )}
              {project.featured && (
                <div className={`${styles.statusBadge} ${styles.featured}`} aria-label="Featured project">Featured</div>
              )}
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>
                {expandedProject === project.id ? project.longDescription : project.description}
              </p>
              <div className={styles.projectTechStack}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    className={styles.projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
                {project.liveUrl && project.liveUrl.trim() !== "" && (
                  <a 
                    href={project.liveUrl} 
                    className={styles.projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
              
              {expandedProject === project.id && (
                <div className={styles.projectDetails}>
                  <h4>Features</h4>
                  <ul className={styles.featuresList}>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className={styles.expandPrompt}>
                <span className={styles.expandIcon}>
                  <i className={`fas ${expandedProject === project.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </span>
                {expandedProject === project.id ? 'Show less' : 'Show details'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'latest' && !showAllLatest && latestProjects.length > 3 && (
        <div className={styles.showMoreContainer}>
          <button 
            className={styles.showMoreButton}
            onClick={() => setShowAllLatest(true)}
          >
            Show More Projects <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      )}

      {visibleProjects.length === 0 && (
        <p className={styles.noProjects}>No projects match the selected filters.</p>
      )}
    </AnimatedSection>
  );
};

export default Projects;