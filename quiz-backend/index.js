const express = require('express');
const app = express();
// const dotenv = require('dotenv');
const usersRoutes = require('./routes/userRoutes');  // Kullanıcılarla ilgili route'ları dahil ediyoruz
const quizzesRoutes = require('./routes/quizRoutes'); // Quizlerle ilgili route'ları dahil ediyoruz
const questionsRoutes = require('./routes/questionRoutes'); // Questionlarla ilgili route'ları dahil ediyoruz 

//dotenv.config();
app.use(express.json());  // JSON verisi almak için middleware

// Kullanıcılarla ilgili API'yi kullanıyoruz
app.use('/users', usersRoutes);
// Quizlerle ilgili API'yi kullanıyoruz
app.use('/quizzes', quizzesRoutes);
// Questionlarla ilgili API'yi kullanıyoruz
app.use('/quizzes', questionsRoutes);

// Portu başlatıyoruz
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});