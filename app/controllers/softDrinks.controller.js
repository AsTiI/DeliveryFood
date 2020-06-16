const Soft_Drinks = require("../models/softDrinks.model.js");

// Retrieve all soft drinks from the database.
exports.findAll = (req, res) => {
    Soft_Drinks.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

