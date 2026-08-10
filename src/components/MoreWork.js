import React, { useState } from 'react';
import styles from '../styles/MoreWork.module.css';
import { moreWork } from '../data/moreWork';
import AnimatedSection from './AnimatedSection';

const WHERE = {
  public: { icon: 'fab fa-github', label: 'Public' },
  private: { icon: 'fas fa-lock', label: 'Private' },
  local: { icon: 'fas fa-hard-drive', label: 'On request' },
};

const MoreWork = () => {
  const [expanded, setExpanded] = useState(false);
  const groups = moreWork.groups || [];
  const visible = expanded ? groups : groups.slice(0, 2);
  const hiddenCount = groups
    .slice(2)
    .reduce((total, group) => total + group.items.length, 0);

  return (
    <AnimatedSection className={styles.moreWork} id="more-work">
      <h2 className={styles.sectionTitle}>More work</h2>
      <p className={styles.intro}>{moreWork.intro}</p>

      <div className={styles.groups}>
        {visible.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {group.title}
              <span className={styles.groupCount}>{group.items.length}</span>
            </h3>
            <ul className={styles.list}>
              {group.items.map((item) => {
                const where = WHERE[item.where] || WHERE.local;
                const Row = (
                  <>
                    <span className={styles.itemHead}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={`${styles.where} ${styles[item.where]}`}>
                        <i className={where.icon}></i> {where.label}
                      </span>
                    </span>
                    <span className={styles.itemNote}>{item.note}</span>
                    <span className={styles.itemStack}>{item.stack}</span>
                  </>
                );

                return (
                  <li key={item.name} className={styles.item}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.itemLink}
                      >
                        {Row}
                      </a>
                    ) : (
                      <div className={styles.itemStatic}>{Row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {!expanded && hiddenCount > 0 && (
        <div className={styles.actions}>
          <button className={styles.showMore} onClick={() => setExpanded(true)}>
            Show {hiddenCount} more <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      )}

      {moreWork.footer && (
        <div className={styles.actions}>
          <a
            className={styles.githubLink}
            href={moreWork.footer.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> {moreWork.footer.text}
          </a>
        </div>
      )}
    </AnimatedSection>
  );
};

export default MoreWork;
