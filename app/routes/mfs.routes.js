module.exports = app => {
    const mfs = require("../controllers/mfs.controller.js");

    // Retrieve all vegetables and fruits
    app.get("/mfs", mfs.findAll);

};