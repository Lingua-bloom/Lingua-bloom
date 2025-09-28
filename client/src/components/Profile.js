import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ userId, preferredLanguage }) {
  const [journal, setJournal] = useState([]);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    fetchJournal();
    const synth = window.speechSynthesis;
    setVoices(synth.getVoices().slice(0, 10));
  }, []);

  const fetchJournal = async () => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    setJournal(response.data.journal);
  };

  return (
    <div>
      <h1>Profile</h1>
      <select>
        {voices.map((v, i) => <option key={i}>{v.name}</option>)}
      </select>
      <ul>{journal.map((entry, i) => <li key={i}>{entry}</li>)}</ul>
    </div>
  );
}

export default Profile;
