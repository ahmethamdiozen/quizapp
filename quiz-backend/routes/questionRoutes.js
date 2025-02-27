const express = require('express');
const router = express.Router();
const { getQuestionsForQuiz, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionsController');

// Quiz'e ait soruları listele
router.get('/:quiz_id/questions', getQuestionsForQuiz);

// Quiz'e yeni bir soru ekle
router.post('/:quiz_id/questions', createQuestion);

// Soru güncelle
router.put('/:quiz_id/questions/:id', updateQuestion);

// Soru sil
router.delete('/:quiz_id/questions/:id', deleteQuestion);

module.exports = router;