# Canlı Quiz Uygulaması

Bu proje, öğretmenlerin ve öğrencilerin canlı olarak quiz yapabileceği gerçek zamanlı bir web uygulamasıdır. Uygulama, Node.js, Express, Socket.IO, PostgreSQL ve HTML/CSS/JS kullanılarak geliştirilmiştir.

## Özellikler

- Gerçek zamanlı katılım ve soru gönderimi (Socket.IO tabanlı)
- Öğretmen paneli üzerinden quiz başlatma ve yönetme
- Öğrenci ekranında canlı olarak soru çözme
- Görsel ve video destekli sorular
- Saniyeye dayalı puanlama sistemi
- Sınav sonunda sıralama (leaderboard) gösterimi
- Quiz oluşturma, listeleme ve düzenleme işlemleri

## Uygulamayı Kullanma

Uygulama [kahoot-production.up.railway.app](https://kahoot-production.up.railway.app/) adresine deploy edilmiştir. Kullanmak isteyenler bu bağlantıyı kullanarak uygulamaya erişebilir.

## Kurulum

### Gereksinimler

- Node.js (v16+)
- PostgreSQL

### Adımlar

1. **Repository'yi klonlayın:**

```bash
git clone https://github.com/ahmethamdiozen/quizapp.git
cd quizapp
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Veritabanını hazırlayın:**

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

4. **Ortam değişkenlerini oluşturun:**

`.env` dosyası oluşturun:

```env
DATABASE_URL=postgresql://kullanici:sifre@localhost:5432/quizapp
JWT_SECRET=çokgizlisifre
```

5. **Sunucuyu başlatın:**

```bash
npm start
```

Uygulama `http://localhost:3000` üzerinde çalışacaktır.

## Klasör Yapısı

```
- public/             → Frontend dosyaları (HTML, CSS, JS)
- routes/             → API route'ları (auth, quiz, vs.)
- sockets/            → Socket.IO olayları
- db.js               → Veritabanı bağlantısı
- server.js           → Express & Socket.IO sunucusu
```

## Kullanım

1. Giriş yapın veya kayıt olun.
2. Quiz oluşturun ya da var olanlardan birini seçin.
3. Öğretmen olarak quiz başlatın ve öğrencilere oda kodunu paylaşın.
4. Öğrenciler oyun ekranından katılır, sorular sırayla canlı olarak gönderilir.
5. Cevaplara göre sıralama belirlenir ve sonuç ekranı gösterilir.

## Lisans

Bu proje MIT lisansı ile sunulmuştur.
