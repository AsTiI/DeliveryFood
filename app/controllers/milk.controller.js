const Milk = require("../models/milk.model.js");

// Retrieve all Vegetables_fruits from the database.
exports.findAll = (req, res) => {
    Milk.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

