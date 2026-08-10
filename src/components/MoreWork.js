import React from 'react';
import styles from '../styles/MoreWork.module.css';
import { moreWork } from '../data/moreWork';

const WHERE = {
  public: { icon: 'fab fa-github', label: 'Public' },
  private: { icon: 'fas fa-lock', label: 'Private' },
  local: { icon: 'fas fa-hard-drive', label: 'On request' },
};

// Rendered inside the Projects section as its own tab, rather than as a second
// section competing with it. Every group renders — a "show more" toggle would
// keep most of this out of the exported HTML.
const MoreWork = () => {
  const groups = moreWork.groups || [];

  return (
    <div className={styles.moreWork}>
      <p className={styles.intro}>{moreWork.intro}</p>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {group.title}
              <span className={styles.groupCount}>{group.items.length}</span>
            </h3>
            <ul className={styles.list}>
              {group.items.map((item) => {
                const where = WHERE[item.where] || WHERE.local;
                const row = (
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
                        {row}
                      </a>
                    ) : (
                      <div className={styles.itemStatic}>{row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default MoreWork;
