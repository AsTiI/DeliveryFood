//Команда require запрашивает модуль из папки node_modules
const mysql = require("mysql2");
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Настройка выдачи статических файлов
app.use('/style', express.static('styles/'));
app.use('/img', express.static('images/'));
app.use('/js', express.static('scripts/'));

const urlencodedParser = bodyParser.urlencoded({extended: false});

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "root",
    database: "diplom",
    password: "16923"
});


connection.query("SELECT * FROM овощи_фрукты",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные
    });
connection.end();

//Обработка корневого маршрута
app.get('/', function (req, res) {
    //Отправляем файл страницы
    res.sendFile(path.join(__dirname + '/index.html'));
});



// получение списка пользователей
app.get("/", function(req, res){
    pool.query("SELECT * FROM овощи_фрукты", function(err, data) {
        if(err) return console.log(err);
        res.render("script.scripts", {
            овощи_фрукты: data
        });
    });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});