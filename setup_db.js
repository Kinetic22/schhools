const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1338', // Твій пароль
    database: 'driving_school',
    multipleStatements: true // Дозволяє виконувати кілька команд одразу
});

const sql = `
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        phone VARCHAR(50),
        birth_date DATE,
        role ENUM('admin', 'student', 'instructor') DEFAULT 'student',
        linked_id INT DEFAULT NULL
    );

    -- Додаємо Адміна одразу, щоб був
    INSERT INTO users (email, password, full_name, role) 
    VALUES ('admin@driveschool.com', 'admin123', 'Головний Адміністратор', 'admin');
`;

db.connect(err => {
    if (err) console.log('❌ Помилка підключення:', err);
    else {
        console.log('⚙️ Оновлюю структуру бази даних...');
        db.query(sql, (err, result) => {
            if (err) console.log('❌ Помилка створення таблиці:', err);
            else console.log('✅ БАЗА ДАНИХ ОНОВЛЕНА УСПІШНО!');
            db.end();
        });
    }
});