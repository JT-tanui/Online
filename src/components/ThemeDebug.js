import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeDebug = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: '#000',
      color: '#fff',
      padding: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      Current theme: {theme}
      <button 
        onClick={toggleTheme} 
        style={{ marginLeft: '10px', cursor: 'pointer' }}
      >
        Force Toggle
      </button>
    </div>
  );
};

export default ThemeDebug;