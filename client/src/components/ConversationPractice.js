import React, { useState, useEffect } from 'react';

function ConversationPractice({ preferredLanguage }) {
  const [recognition, setRecognition] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const rec = new window.webkitSpeechRecognition || window.SpeechRecognition;
    rec.lang = 'en-US';
    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      const score = Math.random() * 10;
      setFeedback(preferredLanguage === 'persian' ? `امتیاز: ${score}/10` : `Score: ${score}/10`);
    };
    setRecognition(rec);
  }, []);

  const startPractice = () => {
    recognition.start();
  };

  return (
    <div>
      <h1>Conversation Practice</h1>
      <button onClick={startPractice}>Speak Phrase</button>
      <p>{feedback}</p>
    </div>
  );
}

export default ConversationPractice;
