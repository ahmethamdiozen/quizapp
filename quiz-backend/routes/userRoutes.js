const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/usersController');

// Kullanıcıları Listele
router.get('/', getUsers);

// Id'ye bagli kullanıcı listele
router.get('/:id', getUserById);

// Yeni Kullanıcı Ekle
router.post('/', createUser);

// Kullanıcı Güncelle
router.put('/:id', updateUser);

// Kullanıcı Sil
router.delete('/:id', deleteUser);

module.exports = router;
