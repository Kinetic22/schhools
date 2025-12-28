const mysql = require('mysql2');

console.log("1. 🏁 Запускаю скрипт перевірки...");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1338', // Перевір, чи тут твій пароль
    database: 'driving_school'
});

console.log("2. 🔌 Пробую підключитися до бази...");

db.connect(err => {
    if (err) {
        console.error("❌ ПОМИЛКА ПІДКЛЮЧЕННЯ:", err.message);
        return;
    }
    console.log("3. ✅ Підключено! Роблю запит до таблиці users...");

    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("❌ ПОМИЛКА SQL ЗАПИТУ:", err.message);
        } else {
            console.log(`4. 📊 Знайдено записів: ${results.length}`);
            
            if (results.length === 0) {
                console.log("⚠️ УВАГА: Таблиця ПУСТА. Жоден користувач не зареєструвався.");
            } else {
                console.log("🎉 ОСТАННІ КОРИСТУВАЧІ:");
                console.table(results); // Виведе гарну табличку
            }
        }
        db.end(); // Закриваємо з'єднання, щоб скрипт не висів
        console.log("5. 🏁 Кінець роботи.");
    });
});