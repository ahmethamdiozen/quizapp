const { client } = require('../db/db');

// Quiz'e ait soruları getir
const getQuestionsForQuiz = async (req, res) => {
    try {
        const { quiz_id } = req.params;
        const result = await client.query(
            'SELECT * FROM questions WHERE quiz_id = $1 ORDER BY id',
            [quiz_id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni soru oluştur
const createQuestion = async (req, res) => {
    try {
        const { quiz_id } = req.params;
        const { question_text, correct_answer, options, points } = req.body;
        
        const result = await client.query(
            'INSERT INTO questions (quiz_id, question_text, correct_answer, options, points) \
            VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [quiz_id, question_text, correct_answer, options, points]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soru güncelle
const updateQuestion = async (req, res) => {
    try {
        const { quiz_id, id } = req.params;
        const { question_text, correct_answer, options, points } = req.body;
        
        const result = await client.query(
            'UPDATE questions SET question_text = $1, correct_answer = $2, options = $3, \
            points = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 AND quiz_id = $6 RETURNING *',
            [question_text, correct_answer, options, points, id, quiz_id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Soru bulunamadı' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soru sil
const deleteQuestion = async (req, res) => {
    try {
        const { quiz_id, id } = req.params;
        const result = await client.query(
            'DELETE FROM questions WHERE id = $1 AND quiz_id = $2 RETURNING id',
            [id, quiz_id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Soru bulunamadı' });
        }
        
        res.json({ message: 'Soru başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuestionsForQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion
};
