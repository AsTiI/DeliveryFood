const sql = require("./db.js");

// constructor
const Soft_Drinks = function(softDrinks) {
    this.name = softDrinks.name;
    this.weight = softDrinks.weight;
    this.description = softDrinks.description;
    this.cost = softDrinks.cost;
    this.image = softDrinks.image;
    this.shopping_basket = '../public/images/shopping_basket.png';

};

Soft_Drinks.getAll = result => {
    sql.query("SELECT sd.name, sd.price as cost, m.name as description, s.size as weight, sd.image " +
        "FROM soft_drinks sd, market m, size s where sd.market_id = m.idMarket AND sd.size_id = s.idSize", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("vegetables_fruits: ", res);
        result(null, res);
    });
};

module.exports = Soft_Drinks;