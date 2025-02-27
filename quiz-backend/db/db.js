const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Veritabanı bağlantı bilgileri
const client = new Client({
  user: process.env.DB_USER,       // .env dosyasından alıyoruz
  host: process.env.DB_HOST,       // .env dosyasından alıyoruz
  database: process.env.DB_NAME,   // .env dosyasından alıyoruz
  password: process.env.DB_PASSWORD, // .env dosyasından alıyoruz
  port: process.env.DB_PORT,       // genellikle 5432
});

// Veritabanına bağlanıyoruz
client.connect()
  .then(() => console.log('PostgreSQL veritabanına başarıyla bağlanıldı!'))
  .catch(err => console.error('Bağlantı hatası:', err));

module.exports = { client };  // client objesini export ediyoruz
