const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "diplom",
    password: "16923"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

connection.query("SELECT * FROM безалк_напитки",
    function(err, results) {
        console.log(err);
        console.log(results); // собственно данные
    });

// закрытие подключения
connection.end(function(err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});