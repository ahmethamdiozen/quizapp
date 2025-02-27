const { client } = require('../db/db');  // db bağlantısını kullanıyoruz

// Quiz oluşturma
const createQuiz = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await client.query('INSERT INTO quizzes (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Quizleri listeleme
const getQuizzes = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM quizzes');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Belirli bir quiz'e ait soruları listeleme
const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
    createQuiz, 
    getQuizzes, 
    getQuizById
};
