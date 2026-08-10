import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import styles from '../styles/Projects.module.css';
import AnimatedSection from './AnimatedSection';

const AVAILABILITY = {
  public: { icon: 'fas fa-code-branch', label: 'Public repository' },
  private: { icon: 'fas fa-lock', label: 'Private repository' },
  local: { icon: 'fas fa-hard-drive', label: 'Local — available on request' },
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  const allProjects = [
    ...projects.completed.map((project) => ({ ...project, status: 'completed' })),
    ...projects.inProgress.map((project) => ({ ...project, status: 'inProgress' })),
  ].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const normalize = (list) =>
    list.map((project) => ({
      ...project,
      categories: project.categories.map((cat) => (cat.toLowerCase() === 'ai' ? 'AI' : cat)),
    }));

  const byCategory = (list, category) => {
    const normalized = normalize(list);
    if (category === 'all') return normalized;
    const lower = category.toLowerCase();
    return normalized.filter((p) => p.categories.some((c) => c.toLowerCase() === lower));
  };

  useEffect(() => {
    const source =
      activeTab === 'all'
        ? allProjects
        : activeTab === 'work'
        ? allProjects.filter((p) => p.kind === 'work')
        : activeTab === 'personal'
        ? allProjects.filter((p) => p.kind === 'personal')
        : allProjects.filter((p) => p.status === 'inProgress');

    setVisibleProjects(byCategory(source, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedProject(null);
    setFilter('all');
  };

  const categories = React.useMemo(
    () =>
      ['all', ...new Set(allProjects.flatMap((p) => p.categories.map((c) => c.toLowerCase())))]
        .sort()
        .map((c) => (c === 'ai' ? 'AI' : c.charAt(0).toUpperCase() + c.slice(1))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const toggleProject = (id, event) => {
    if (
      event.target.tagName === 'A' ||
      event.target.parentElement?.tagName === 'A' ||
      event.target.tagName === 'I'
    ) {
      return;
    }
    setExpandedProject(expandedProject === id ? null : id);
  };

  const counts = {
    all: allProjects.length,
    work: allProjects.filter((p) => p.kind === 'work').length,
    personal: allProjects.filter((p) => p.kind === 'personal').length,
    inProgress: allProjects.filter((p) => p.status === 'inProgress').length,
  };

  const tabs = [
    { key: 'all', icon: 'fas fa-th-large', label: 'All' },
    { key: 'work', icon: 'fas fa-briefcase', label: 'Professional' },
    { key: 'personal', icon: 'fas fa-code', label: 'Personal' },
    { key: 'inProgress', icon: 'fas fa-code-branch', label: 'In Progress' },
  ];

  return (
    <AnimatedSection className={styles.projects} id="projects">
      <div className={styles.projectsBanner}>
        <div className={styles.bannerContennt}>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>
      </div>

      <p className={styles.projectsIntro}>
        Work marked <strong>Professional</strong> belongs to my employer — I contributed to it,
        with my share stated on each card. Everything under <strong>Personal</strong> is my own.
        Line counts exclude dependencies and vendored code.
      </p>

      <div className={styles.tabContainer}>
        <div className={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabOption} ${activeTab === tab.key ? styles.active : ''}`}
              onClick={() => handleTabChange(tab.key)}
              aria-label={tab.label}
            >
              <i className={tab.icon}></i> {tab.label}
              <span className={styles.tabCount}>{counts[tab.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterLabel}>Filter by:</div>
        <div className={styles.filterButtons}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.filterButton} ${
                filter === category.toLowerCase() ? styles.active : ''
              }`}
              onClick={() => setFilter(category.toLowerCase())}
              data-category={category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {visibleProjects.map((project) => {
          const availability = AVAILABILITY[project.availability];
          const isOpen = expandedProject === project.id;

          return (
            <div
              key={project.id}
              className={`${styles.projectCard} ${isOpen ? styles.expanded : ''}`}
              onClick={(e) => toggleProject(project.id, e)}
            >
              <div className={styles.projectImageContainer}>
                {project.image ? (
                  <div
                    className={styles.projectImage}
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                ) : (
                  <div
                    className={styles.projectMonogram}
                    style={{ '--accent': project.accent || 'var(--primary-color)' }}
                    aria-hidden="true"
                  >
                    {project.title.charAt(0)}
                  </div>
                )}
                {project.status === 'inProgress' && (
                  <div className={styles.statusBadge}>In Progress</div>
                )}
                {project.kind === 'work' && (
                  <div className={`${styles.statusBadge} ${styles.workBadge}`}>
                    {project.employer}
                  </div>
                )}
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>

                {project.contribution && (
                  <p className={styles.contribution}>
                    <i className="fas fa-user-check"></i> {project.contribution}
                  </p>
                )}

                <p className={styles.projectDescription}>
                  {isOpen ? project.longDescription : project.description}
                </p>

                {project.stats && (
                  <div className={styles.statRow}>
                    {project.stats.loc && (
                      <span className={styles.stat}>
                        <i className="fas fa-code"></i> {project.stats.loc}
                      </span>
                    )}
                    {project.stats.span && (
                      <span className={styles.stat}>
                        <i className="fas fa-calendar"></i> {project.stats.span}
                      </span>
                    )}
                  </div>
                )}

                <div className={styles.projectTechStack}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl.trim() !== '' && (
                    <a
                      href={project.liveUrl}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-external-link-alt"></i> Visit site
                    </a>
                  )}
                  {!project.githubUrl && availability && (
                    <span className={styles.projectLinkMuted}>
                      <i className={availability.icon}></i> {availability.label}
                    </span>
                  )}
                </div>

                {isOpen && (
                  <div className={styles.projectDetails}>
                    {project.stats?.detail && (
                      <p className={styles.statDetail}>{project.stats.detail}</p>
                    )}
                    <h4>Features</h4>
                    <ul className={styles.featuresList}>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    {project.challenge && (
                      <>
                        <h4>What was hard about this</h4>
                        <p className={styles.projectChallenge}>{project.challenge}</p>
                      </>
                    )}
                  </div>
                )}

                <div className={styles.expandPrompt}>
                  <span className={styles.expandIcon}>
                    <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </span>
                  {isOpen ? 'Show less' : 'Show details'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleProjects.length === 0 && (
        <p className={styles.noProjects}>No projects match the selected filters.</p>
      )}
    </AnimatedSection>
  );
};

export default Projects;
