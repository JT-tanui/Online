import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { skills } from '../data/skills';

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };

    // Set initial dark mode state
    checkDarkMode();

    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Prepare chart data
    const technicalSkills = skills.technical.slice(0, 6); // Take top 6 skills for clarity
    
    setChartData({
      labels: technicalSkills.map(skill => skill.name),
      datasets: [
        {
          label: 'Technical Proficiency',
          data: technicalSkills.map(skill => skill.level),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    });

    return () => observer.disconnect();
  }, []);

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: isDarkMode ? '#e6edf3' : '#333333',
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDarkMode ? '#e6edf3' : '#333333',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#e6edf3' : '#333333',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SkillsRadarChart;