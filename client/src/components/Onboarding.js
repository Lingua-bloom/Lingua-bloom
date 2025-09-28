import React, { useState } from 'react';
import axios from 'axios';

function Onboarding({ setPreferredLanguage, setUserId }) {
  const [email, setEmail] = useState('');
  const [prefLang, setPrefLang] = useState('english');
  const [targetLangs, setTargetLangs] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:5000/users', {
      email,
      preferred_language: prefLang,
      target_languages: targetLangs
    });
    setUserId(response.data._id);
    setPreferredLanguage(prefLang);
    window.location.href = '/dashboard';
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <select onChange={(e) => setPrefLang(e.target.value)}>
        <option value="english">English</option>
        <option value="persian">Persian</option>
      </select>
      <select multiple onChange={(e) => setTargetLangs([...e.target.selectedOptions].map(o => o.value))}>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Italian">Italian</option>
        <option value="French">French</option>
        <option value="Swedish">Swedish</option>
      </select>
      <button onClick={handleSubmit}>Start</button>
    </div>
  );
}

export default Onboarding;
