const { client } = require('../db/db');  // PostgreSQL bağlantısı

// Quiz'e ait tüm soruları listele
const getQuestionsForQuiz = async (req, res) => {
  const quizId = req.params.quiz_id;  // URL parametresinden quizId'yi alıyoruz

  try {
    const result = await client.query('SELECT * FROM questions WHERE quiz_id = $1', [quizId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching questions for quiz:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Quiz'e yeni bir soru ekle
const createQuestion = async (req, res) => {
    const quizId = req.params.quiz_id;  // Parametreyi doğru aldığınızdan emin olun
    const { question_text, choices, correct_answer } = req.body;
  
    if (!quizId) {
      return res.status(400).json({ error: "Quiz ID is required" });  // Quiz ID olmaması durumunda hata döndürmek için ekledim
    }
  
    try {
      const result = await client.query(
        'INSERT INTO questions (quiz_id, question_text, choices, correct_answer) VALUES ($1, $2, $3, $4) RETURNING *',
        [quizId, question_text, choices, correct_answer]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating question:', err);
      res.status(500).json({ error: 'Failed to create question' });
    }
  };
  


// Soruyu güncelle
const updateQuestion = async (req, res) => {
    const { quiz_id, id } = req.params; // quiz_id ve id'yi URL parametrelerinden alıyoruz
    const { question_text, choices, correct_answer } = req.body;
    
    try {
      // Sorgu: Eğer verilen question_id ve quiz_id'ye sahip bir kayıt varsa güncelleniyor
      const result = await client.query(
        'UPDATE questions SET question_text = $1, choices = $2, correct_answer = $3 WHERE id = $4 AND quiz_id = $5 RETURNING *',
        [question_text, choices, correct_answer, id, quiz_id]
      );
      // Eğer soru bulunamazsa hata mesajı gönderilir
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Question not found or does not belong to this quiz' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('Error updating question:', err);
      res.status(500).json({ error: 'Failed to update question' });
    }
  };

// Soruyu sil
const deleteQuestion = async (req, res) => {
    const {quiz_id, id } = req.params;

  try {
    const result = await client.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

module.exports = {
  getQuestionsForQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
