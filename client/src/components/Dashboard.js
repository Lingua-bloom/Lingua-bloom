import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Dashboard({ userId, preferredLanguage }) {
  const [progress, setProgress] = useState({});
  const [tutorMessage, setTutorMessage] = useState('');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    setProgress(response.data.progress);
    setTutorMessage(preferredLanguage === 'persian' ? 'پیشرفت شما عالی است!' : 'Your progress is great!');
  };

  const data = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [{ label: 'Progress', data: Object.values(progress).map(v => v.beginner || 0) }]
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{tutorMessage}</p>
      <Line data={data} />
    </div>
  );
}

export default Dashboard;
