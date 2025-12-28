const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ТУТ ГОЛОВНА ЗМІНА: Використовуємо createPool замість createConnection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1338', // Твій пароль
    database: 'driving_school',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Перевірка підключення (тестовий запит)
db.query('SELECT 1', (err, results) => {
    if (err) console.error('❌ Помилка з\'єднання з БД:', err.message);
    else console.log('✅ База даних підключена (Pool активний)');
});

// --- РЕЄСТРАЦІЯ ---
app.post('/api/register', (req, res) => {
    const { email, password, fullName, phone, birthDate } = req.body;
    console.log(`📩 РЕЄСТРАЦІЯ: ${email}`);

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        if (result.length > 0) return res.json({ success: false, message: "Цей Email вже є!" });

        const sql = "INSERT INTO users (email, password, full_name, phone, birth_date, role) VALUES (?, ?, ?, ?, ?, 'student')";
        db.query(sql, [email, password, fullName, phone, birthDate], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: "Помилка запису" });
            }
            console.log(`👤 Успішно створено ID: ${result.insertId}`);
            res.json({ success: true });
        });
    });
});

// --- ВХІД ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`🔑 ВХІД: ${email}`);

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error("❌ Помилка SQL:", err);
            return res.status(500).json({ success: false, message: "Помилка сервера" });
        }
        
        if (result.length > 0) {
            console.log(`✅ Пускаємо користувача: ${result[0].full_name}`);
            res.json({ success: true, user: result[0] });
        } else {
            console.log("⛔ Невірний пароль");
            res.status(401).json({ success: false, message: "Невірний логін/пароль" });
        }
    });
});

// Заглушки для розкладу
app.get('/api/admin/schedule', (req, res) => res.json([]));
app.get('/api/instructor/schedule', (req, res) => res.json([]));
app.get('/api/student/schedule', (req, res) => res.json([]));

app.listen(3000, () => {
    console.log('🚀 Сервер перезапущено і готовий до роботи!');
});