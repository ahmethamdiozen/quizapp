const { client } = require('../db/db');  // Veritabanı bağlantısını import ediyoruz

// Kullanıcıları Listele
const getUsers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
};

// Yeni Kullanıcı Ekle
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
};

// Kullanıcı Güncelle
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  
  try {
    const result = await client.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [username, email, password, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
};

// Kullanıcı Sil
const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
};

module.exports = { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser 
}