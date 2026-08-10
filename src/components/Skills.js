import React, { useState } from 'react';
import styles from '../styles/Skills.module.css';
import { skills } from '../data/skills';
import AnimatedSection from './AnimatedSection';

// Font Awesome Free has brand marks for some of these and nothing for the
// rest, so anything unmatched falls back to a neutral glyph rather than a
// wrong one.
const ICONS = {
  Python: 'fab fa-python',
  TypeScript: 'fas fa-code',
  'C#': 'fas fa-hashtag',
  JavaScript: 'fab fa-js',
  SQL: 'fas fa-database',
  Dart: 'fas fa-bullseye',
  Django: 'fas fa-server',
  FastAPI: 'fas fa-bolt',
  PostgreSQL: 'fas fa-database',
  'REST API design': 'fas fa-plug',
  WebSockets: 'fas fa-tower-broadcast',
  'SQLAlchemy & Alembic': 'fas fa-layer-group',
  Redis: 'fas fa-bolt',
  'SQLite & EF Core': 'fas fa-database',
  React: 'fab fa-react',
  'Next.js': 'fas fa-n',
  'Tailwind CSS': 'fas fa-wind',
  Vite: 'fas fa-bolt',
  'Component library work': 'fas fa-cubes',
  WPF: 'fab fa-windows',
  '.NET 10 / .NET 8': 'fas fa-diamond',
  'Windows App SDK': 'fab fa-windows',
  '.NET MAUI': 'fas fa-mobile-screen',
  Flutter: 'fas fa-mobile-screen',
  'MSIX & Play Store packaging': 'fas fa-box-open',
  'Docker & Compose': 'fab fa-docker',
  Git: 'fab fa-git-alt',
  'GitHub Actions': 'fab fa-github',
  nginx: 'fas fa-diagram-project',
  Linux: 'fab fa-linux',
  AWS: 'fab fa-aws',
  'ONNX Runtime': 'fas fa-microchip',
  LiveKit: 'fas fa-phone-volume',
  'whisper / whisper.cpp': 'fas fa-waveform',
  FFmpeg: 'fas fa-film',
  pgvector: 'fas fa-vector-square',
};

const Skills = () => {
  const groups = skills?.groups || [];
  const practices = skills?.practices || [];
  const [activeGroup, setActiveGroup] = useState(groups[0]?.title);

  const current = groups.find((g) => g.title === activeGroup) || groups[0];

  return (
    <AnimatedSection className={styles.skills} id="skills">
      <h2 className={styles.sectionTitle}>Skills</h2>

      <p className={styles.skillsNote}>
        Ordered by how much of my shipped work uses each one, not by a number I made up
        about myself. Every entry names the codebase behind it.
      </p>

      <div className={styles.skillsTabs}>
        {groups.map((group) => (
          <button
            key={group.title}
            className={`${styles.tabButton} ${
              activeGroup === group.title ? styles.active : ''
            }`}
            onClick={() => setActiveGroup(group.title)}
          >
            {group.title}
            <span className={styles.tabCount}>{group.items.length}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className={styles.skillsGallery} key={current.title}>
          {current.items.map((item, index) => (
            <div
              key={item.name}
              className={styles.skillCard}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className={styles.skillCardIcon}>
                <i className={ICONS[item.name] || 'fas fa-wrench'}></i>
              </div>
              <h4 className={styles.skillCardName}>{item.name}</h4>
              <p className={styles.skillCardEvidence}>{item.evidence}</p>
            </div>
          ))}
        </div>
      )}

      {practices.length > 0 && (
        <div className={styles.practicesBlock}>
          <h3 className={styles.practicesTitle}>How I work</h3>
          <div className={styles.practices}>
            {practices.map((practice) => (
              <span key={practice} className={styles.practiceItem}>
                {practice}
              </span>
            ))}
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default Skills;
