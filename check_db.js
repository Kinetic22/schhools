const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '1338', database: 'driving_school'
});

db.query("SELECT id, email, password, full_name, role FROM users", (err, results) => {
    if (err) console.log(err);
    else {
        console.log("🕵️‍♂️ ОСЬ ЩО ЗАПИСАНО В БАЗІ:");
        console.table(results);
    }
    db.end();
});