module.exports = app => {
    const confectionery = require("../controllers/confectionery.controller.js");

    // Retrieve all soft drinks
    app.get("/confectionery", confectionery.findAll);
};