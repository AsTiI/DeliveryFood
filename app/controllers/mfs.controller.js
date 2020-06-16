const MFS = require("../models/mfs.model.js");

// Retrieve all Vegetables_fruits from the database.
exports.findAll = (req, res) => {
    MFS.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

