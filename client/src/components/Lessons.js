import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBot from './ChatBot';

function Lessons({ userId, preferredLanguage }) {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    fetchLessons();
    loadVoices();
  }, []);

  const fetchLessons = async () => {
    const response = await axios.get('http://localhost:5000/lessons');
    setLessons(response.data);
  };

  const loadVoices = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices().slice(0, 10);
    setVoice(voices[0]);
  };

  const startLecture = (lesson) => {
    setCurrentLesson(lesson);
    const utterance = new SpeechSynthesisUtterance(lesson.content);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Lessons</h1>
      {lessons.map(l => <button key={l._id} onClick={() => startLecture(l)}>{l.topic}</button>)}
      {currentLesson && <p>{currentLesson.content}</p>}
      <button>Interrupt for Question</button>
    </div>
  );
}

export default Lessons;
