module.exports = app => {
    const milk = require("../controllers/milk.controller.js");

    // Retrieve all milk
    app.get("/milk", milk.findAll);
};