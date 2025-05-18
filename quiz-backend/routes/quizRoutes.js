const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuizById, deleteQuiz } = require('../controllers/quizzesController');

// Quiz oluşturma
router.post('/', createQuiz);

// Quizleri listeleme
router.get('/', getQuizzes);

// ID'ye göre quiz getirme
router.get('/:id', getQuizById);

// ID'ye göre quiz silme
router.delete('/:id', deleteQuiz);

module.exports = router;
