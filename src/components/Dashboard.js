import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { getStockStats, getUserRegistrationStats } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [userStats, setUserStats] = useState([]);
  const [stockStats, setStockStats] = useState([]);
  const userChartRef = useRef(null);
  const stockChartRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userResponse = await getUserRegistrationStats();
        setUserStats(userResponse.data);

        const stockResponse = await getStockStats();
        setStockStats(stockResponse.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (userChartRef.current) {
      userChartRef.current.destroy();
    }
    userChartRef.current = new Chart(document.getElementById('userChart'), {
      type: 'line',
      data: {
        labels: userStats.map(stat => `${stat._id.month}/${stat._id.year}`),
        datasets: [
          {
            label: 'User Registrations',
            data: userStats.map(stat => stat.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
    });
  }, [userStats]);

  useEffect(() => {
    if (stockChartRef.current) {
      stockChartRef.current.destroy();
    }
    stockChartRef.current = new Chart(document.getElementById('stockChart'), {
      type: 'bar',
      data: {
        labels: stockStats.map(stat => `${stat._id.month}/${stat._id.year}`),
        datasets: [
          {
            label: 'Total Stock Quantity',
            data: stockStats.map(stat => stat.totalQuantity),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
        ],
      },
    });
  }, [stockStats]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>User Registrations in the Last Month</h3>
          <canvas id="userChart"></canvas>
        </div>
        <div className="chart">
          <h3>Total Stock Quantity Per Month</h3>
          <canvas id="stockChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

