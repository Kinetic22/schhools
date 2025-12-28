const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1338', // Твій пароль
    database: 'driving_school',
    multipleStatements: true
});

const sql = `
    DROP TABLE IF EXISTS users;
    
    CREATE TABLE users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'student', 'instructor') NOT NULL DEFAULT 'student',
        full_name VARCHAR(255),
        birth_date DATE,
        phone VARCHAR(20),
        linked_id INT UNSIGNED NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO users (email, password, role, full_name) VALUES 
    ('admin@school.com', 'admin', 'admin', 'Головний Адміністратор');
`;

db.connect(err => {
    if (err) return console.error('❌ Помилка підключення:', err.message);
    console.log('✅ Підключено до БД.');

    db.query(sql, (err, result) => {
        if (err) console.error('❌ Помилка SQL:', err.message);
        else console.log('🎉 УРА! Таблиця users ПОВНІСТЮ оновлена (нові поля додано).');
        db.end();
    });
});