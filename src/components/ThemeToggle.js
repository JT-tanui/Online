import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={styles.toggleTrack}>
        <span className={`${styles.toggleIcon} ${styles.sun}`}>
          <i className="fas fa-sun"></i>
        </span>
        <div className={styles.toggleThumb}></div>
        <span className={`${styles.toggleIcon} ${styles.moon}`}>
          <i className="fas fa-moon"></i>
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;