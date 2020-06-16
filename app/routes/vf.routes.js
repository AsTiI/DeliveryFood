module.exports = app => {
    const vegetables_fruits = require("../controllers/vf.controller.js");

    // Retrieve all vegetables and fruits
    app.get("/vf", vegetables_fruits.findAll);
};