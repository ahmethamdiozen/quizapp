const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuizById } = require('../controllers/quizzesController');

// Quiz oluşturma
router.post('/', createQuiz);

// Quizleri listeleme
router.get('/', getQuizzes);

// ID'ye göre quiz getirme
router.get('/:id', getQuizById);

module.exports = router;
