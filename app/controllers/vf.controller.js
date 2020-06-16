const Vegetables_fruits = require("../models/vf.model.js");

// Retrieve all Vegetables_fruits from the database.
exports.findAll = (req, res) => {
    Vegetables_fruits.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

