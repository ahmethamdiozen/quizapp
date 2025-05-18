const fs = require('fs');
const path = require('path');
const { client } = require('./db');

async function runMigration() {
    try {
        // Migration dosyasını oku
        const migrationPath = path.join(__dirname, '001_initial_schema.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Migration'ı çalıştır
        await client.query(migrationSQL);
        console.log('Migration başarıyla tamamlandı!');
    } catch (error) {
        console.error('Migration hatası:', error);
    } finally {
        // Bağlantıyı kapat
        await client.end();
    }
}

runMigration(); 