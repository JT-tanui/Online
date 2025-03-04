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
import styles from '../styles/SkillRadarChart.module.css';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillRadarChart = ({ skills }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Get current theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Create chart data from skills
    setChartData({
      labels: skills.map(skill => skill.name),
      datasets: [
        {
          label: 'Skill Level',
          data: skills.map(skill => skill.level),
          backgroundColor: 'rgba(0, 112, 243, 0.2)',
          borderColor: '#0070f3',
          borderWidth: 2,
          pointBackgroundColor: '#0070f3',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#0070f3',
          pointRadius: 4,
        }
      ]
    });

    // Set chart options
    setChartOptions({
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            display: false,
            stepSize: 20
          },
          grid: {
            color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          pointLabels: {
            color: isDarkMode ? '#e6edf3' : '#333',
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#2d333b' : 'rgba(0, 0, 0, 0.75)',
          titleColor: isDarkMode ? '#e6edf3' : '#fff',
          bodyColor: isDarkMode ? '#e6edf3' : '#fff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 12
          },
          padding: 10,
          displayColors: false
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    });
  }, [skills]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SkillRadarChart;