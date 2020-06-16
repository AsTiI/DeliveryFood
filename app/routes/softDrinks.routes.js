module.exports = app => {
    const soft_Drinks = require("../controllers/softDrinks.controller.js");

    // Retrieve all soft drinks
    app.get("/softDrinks", soft_Drinks.findAll);
};