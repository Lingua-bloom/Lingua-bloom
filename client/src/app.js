import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Lessons from './components/Lessons';
import ConversationPractice from './components/ConversationPractice';
import Profile from './components/Profile';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [preferredLanguage, setPreferredLanguage] = useState('english');
  const [userId, setUserId] = useState(null);

  const isRTL = preferredLanguage === 'persian';
  document.body.dir = isRTL ? 'rtl' : 'ltr';

  return (
    <Router>
      <div className="app" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Routes>
          <Route path="/" element={<Onboarding setPreferredLanguage={setPreferredLanguage} setUserId={setUserId} />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} preferredLanguage={preferredLanguage} />} />
          <Route path="/lessons" element={<Lessons userId={userId} preferredLanguage={preferredLanguage} />} />
          <Route path="/practice" element={<ConversationPractice preferredLanguage={preferredLanguage} />} />
          <Route path="/profile" element={<Profile userId={userId} preferredLanguage={preferredLanguage} />} />
          <Route path="/chat" element={<ChatBot preferredLanguage={preferredLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
