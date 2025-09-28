require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const wordSchema = new mongoose.Schema({
  word: String,
  language: String,
  category: String,
  difficulty: String,
  pronunciation: String,
  translation_english: String,
  translation_persian: String,
  example_english: String,
  example_persian: String,
  audio_url: String
});
const Word = mongoose.model('Word', wordSchema);

const lessonSchema = new mongoose.Schema({
  language: String,
  level: String,
  topic: String,
  content: String,
  assessment_questions: Array
});
const Lesson = mongoose.model('Lesson', lessonSchema);

const userSchema = new mongoose.Schema({
  email: String,
  preferred_language: String,
  target_languages: Array,
  progress: Object,
  journal: Array
});
const User = mongoose.model('User', userSchema);

async function seedData() {
  if (await Word.countDocuments() === 0) {
    await Word.insertMany([
      { word: 'hello', language: 'English', translation_persian: 'سلام', difficulty: 'beginner', audio_url: '' },
      { word: 'bonjour', language: 'French', translation_persian: 'سلام', difficulty: 'beginner', audio_url: '' },
      { word: 'hola', language: 'Spanish', translation_persian: 'سلام', difficulty: 'beginner', audio_url: '' },
      { word: 'ciao', language: 'Italian', translation_persian: 'سلام', difficulty: 'beginner', audio_url: '' },
      { word: 'hej', language: 'Swedish', translation_persian: 'سلام', difficulty: 'beginner', audio_url: '' },
    ]);
  }
  if (await Lesson.countDocuments() === 0) {
    await Lesson.insertMany([
      { language: 'English', level: 'beginner', topic: 'Greetings', content: 'Today, we learn basic greetings...', assessment_questions: [{ q: 'What is hello?', a: 'hello' }] },
      { language: 'Swedish', level: 'beginner', topic: 'Greetings', content: 'Today, we learn basic greetings like hej...', assessment_questions: [{ q: 'What is hej?', a: 'hello' }] },
    ]);
  }
}
seedData();

app.get('/words', async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

app.put('/words/:id', async (req, res) => {
  const updated = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.get('/lessons', async (req, res) => {
  const lessons = await Lesson.find(req.query);
  res.json(lessons);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.post('/assess', async (req, res) => {
  const { userId, language, level, score } = req.body;
  const user = await User.findById(userId);
  if (!user.progress[language]) user.progress[language] = {};
  user.progress[language][level] = score;
  if (score > 80) user.journal.push('Great job! Skipping to next level.');
  else if (score < 70) user.journal.push('Adding extra drills for this topic.');
  await user.save();
  res.json(user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
