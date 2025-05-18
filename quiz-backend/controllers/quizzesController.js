const { client } = require('../db/db');

// Tüm quizleri getir
const getQuizzes = async (req, res) => {
    try {
        const result = await client.query(`
            SELECT q.*, u.username as creator_name 
            FROM quizzes q 
            LEFT JOIN users u ON q.created_by = u.id
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ID'ye göre quiz getir
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query(`
            SELECT q.*, u.username as creator_name 
            FROM quizzes q 
            LEFT JOIN users u ON q.created_by = u.id 
            WHERE q.id = $1
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz bulunamadı' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni quiz oluştur
const createQuiz = async (req, res) => {
    try {
        const { title, description, created_by } = req.body;
        
        const result = await client.query(
            'INSERT INTO quizzes (title, description, created_by) VALUES ($1, $2, $3) RETURNING *',
            [title, description, created_by]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Quiz silme
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Önce quiz'in var olup olmadığını kontrol et
        const checkResult = await client.query('SELECT * FROM quizzes WHERE id = $1', [id]);
        
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz bulunamadı' });
        }
        
        // Quiz'i sil
        await client.query('DELETE FROM quizzes WHERE id = $1', [id]);
        
        res.json({ message: 'Quiz başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuizzes,
    getQuizById,
    createQuiz,
    deleteQuiz
};
