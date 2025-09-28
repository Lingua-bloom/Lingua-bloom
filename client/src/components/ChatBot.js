import React, { useState } from 'react';

function ChatBot({ preferredLanguage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { user: input }]);
    const response = input.includes('why') ? (preferredLanguage === 'persian' ? 'در تجربه ۲۰ ساله‌ام...' : 'In my 20 years experience...') : 'Great question!';
    setMessages([...messages, { user: input, bot: response }]);
    setInput('');
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Chat with Tutor</h1>
      {messages.map((m, i) => <p key={i}>{m.user} - {m.bot}</p>)}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatBot;
