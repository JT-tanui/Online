import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../context/ThemeContext';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('technical');
  const { theme } = useTheme();
  // const chartRef = useRef(null);
  
  // Reference for the animated skill bars
  const skillBarsRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Animation for skill bars when they come into view
    if (skillBarsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const bar = entry.target;
              const level = bar.getAttribute('data-level');
              bar.style.setProperty('--skill-width', `${level}%`);
              bar.classList.add(styles.animate);
              observer.unobserve(bar);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      const skillBars = skillBarsRef.current.querySelectorAll(`.${styles.progress}`);
      skillBars.forEach(bar => observer.observe(bar));
      
      return () => {
        skillBars.forEach(bar => observer.unobserve(bar));
      };
    }
  }, [mounted, activeTab]);
  
  // Get the appropriate skills for the current tab
  const getTabSkills = () => {
    switch (activeTab) {
      case 'technical':
        return skills?.technical?.slice(0, 6) || [];
      case 'tools':
        return skills?.tools?.slice(0, 6) || [];
      case 'soft':
        return skills?.soft?.slice(0, 6).map(skill => {
          return typeof skill === 'string' ? { name: skill, level: 85 } : skill;
        }) || [];
      default:
        return [];
    }
  };
  
  // Prepare data for radar chart based on active tab
  const activeSkills = getTabSkills();
  
  const chartData = {
    labels: activeSkills.map(skill => skill.name),
    datasets: [
      {
        label: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Skills`,
        data: activeSkills.map(skill => skill.level),
        backgroundColor: theme === 'dark' 
          ? 'rgba(79, 154, 230, 0.3)' 
          : 'rgba(33, 150, 243, 0.2)',
        borderColor: theme === 'dark'
          ? 'rgba(79, 154, 230, 0.8)'
          : 'rgba(33, 150, 243, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: theme === 'dark'
          ? 'rgba(79, 154, 230, 1)'
          : 'rgba(33, 150, 243, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(33, 150, 243, 1)'
      }
    ]
  };
  
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          color: theme === 'dark' ? '#e2e8f0' : '#333',
          font: {
            size: 12
          }
        },
        ticks: {
          backdropColor: 'transparent',
          color: theme === 'dark' ? '#e2e8f0' : '#333',
          stepSize: 20
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#2d3748' : '#fff',
        titleColor: theme === 'dark' ? '#e2e8f0' : '#333',
        bodyColor: theme === 'dark' ? '#e2e8f0' : '#333',
        borderColor: theme === 'dark' ? '#4a5568' : '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <AnimatedSection className={styles.skills} id="skills">
      <h2 className={styles.sectionTitle}>Skills</h2>
      
      <div className={styles.skillsTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'technical' ? styles.active : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          Technical
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'tools' ? styles.active : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools & Technologies
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'soft' ? styles.active : ''}`}
          onClick={() => setActiveTab('soft')}
        >
          Soft Skills
        </button>
      </div>
      
      <div className={styles.container}>
        {/* Skills Radar Chart */}
        <div className={styles.skillsVisual}>
          <div className={styles.radarChart}>
            {mounted && (
              <Radar data={chartData} options={chartOptions} key={activeTab} />
            )}
          </div>
        </div>

        {/* Skills Lists */}
        <div className={styles.skillsGrid} ref={skillBarsRef}>
          {activeTab === 'technical' && (
            <div className={styles.skillCategory}>
              <h3>Technical Skills</h3>
              <div className={styles.skillBarsCompact}>
                {skills?.technical?.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <div className={styles.skillInfoCompact}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPercentage}>{skill.level}%</span>
                    </div>
                    <div className={styles.progressBarCompact}>
                      <div 
                        className={styles.progress} 
                        data-level={skill.level}
                        style={{ width: mounted ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                )) || <p className={styles.noData}>No technical skills data available</p>}
              </div>
            </div>
          )}
          
          {activeTab === 'tools' && (
            <div className={styles.skillCategory}>
              <h3>Tools & Technologies</h3>
              <div className={styles.skillsGallery}>
                {skills?.tools?.map((skill, index) => (
                  <div key={index} className={styles.skillCard}>
                    <div className={styles.skillCardIcon}>
                      <i className={`fas ${getIconForSkill(skill.name)}`}></i>
                    </div>
                    <h4>{skill.name}</h4>
                    <div className={styles.skillRating}>
                      {Array(5).fill(0).map((_, i) => (
                        <span 
                          key={i} 
                          className={i < Math.round(skill.level / 20) ? styles.filled : ''}
                        >★</span>
                      ))}
                    </div>
                  </div>
                )) || <p className={styles.noData}>No tools data available</p>}
              </div>
            </div>
          )}
          
          {activeTab === 'soft' && (
            <div className={styles.skillCategory}>
              <h3>Soft Skills</h3>
              <div className={styles.softSkills}>
                {skills?.soft?.map((skill, index) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <div key={index} className={styles.softSkillItem}>
                      {skillName}
                    </div>
                  );
                }) || <p className={styles.noData}>No soft skills data available</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Helper function to assign icons
function getIconForSkill(skill) {
  const icons = {
    'Git': 'fa-code-branch',
    'GitHub': 'fa-github',
    'Webpack': 'fa-cube',
    'Docker': 'fa-docker',
    'AWS': 'fa-cloud',
    'Figma': 'fa-pencil-ruler',
    'Jest': 'fa-vial',
    'Node.js': 'fa-node-js',
    'React': 'fa-react',
    'Next.js': 'fa-n',
    'TypeScript': 'fa-code',
    'JavaScript': 'fa-js',
    'Python': 'fa-python',
    'HTML': 'fa-html5',
    'CSS': 'fa-css3-alt',
    'MongoDB': 'fa-database',
    'PostgreSQL': 'fa-database',
    // Add more mappings as needed
  };
  
  return icons[skill] || 'fa-wrench'; // Default icon
}

export default Skills;