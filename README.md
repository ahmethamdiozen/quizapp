# Live Quiz Application

This project is a real-time web application where teachers and students can participate in live quizzes. The application is developed using Node.js, Express, Socket.IO, PostgreSQL, and HTML/CSS/JS.

## Technologies Used

- Frontend: HTML, CSS, JavaScript (Vanilla)
- Backend: Node.js, Express.js
- Real-Time Communication: Socket.IO
- Database: PostgreSQL
- AI API: OpenAI ChatGPT

## Features

- Real-time participation and question delivery (Socket.IO-based)
- Quiz creation and management via teacher panel
- Live question solving on the student screen
- Image and video supported questions
- Time-based scoring system (per second)
- AI-powered quiz generation
- Leaderboard display at the end of the quiz
- Quiz creation, listing, and editing operations

## AI-Powered Quiz Generation

The application provides an AI-powered automatic quiz generation feature using the OpenAI API. Users can generate a quiz within seconds by specifying a topic. This feature allows teachers to save time by creating customizable content efficiently.

## Using the Application

The application is deployed at [kahoot-production.up.railway.app](https://kahoot-production.up.railway.app/). Anyone who wants to use it can access the application via this link.

## Installation

### Requirements

- Node.js (v16+)
- PostgreSQL

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/ahmethamdiozen/quizapp.git
cd quizapp
```

2. **Install dependencies:**

```bash
npm install
```

3. **Prepare the database:**

```sql
CREATE DATABASE quizapp;

-- Gerekli tablolar
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  text TEXT NOT NULL,
  options TEXT[],
  correct INTEGER,
  image_url TEXT,
  video_url TEXT,
  duration INTEGER
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  code TEXT UNIQUE NOT NULL
);
```

4. **Create environment variables::**

 Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/quizapp
JWT_SECRET=verysecretkey
```

5. **Start the server:**

```bash
npm start
```

The application will run at `http://localhost:3000`

## Folder Structure

```
- public/             → Frontend files (HTML, CSS, JS)
- routes/             → API routes (auth, quiz, etc.)
- sockets/            → Socket.IO events
- db.js               → Database connection
- server.js           → Express & Socket.IO server
```

## Usage

1. Log in or register.
2. Create a quiz or select an existing one.
3. Start the quiz as a teacher and share the room code with students.
4. Students join via the game screen; questions are sent live in sequence.
5. Rankings are determined based on answers, and the results screen is displayed.
