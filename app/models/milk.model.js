const sql = require("./db.js");

// constructor
const Milk = function(milk) {
    this.name = milk.name;
    this.weight = milk.weight || '1 шт';
    this.description = milk.description;
    this.cost = milk.cost;
    this.image = milk.image;
    this.shopping_basket = '../public/images/shopping_basket.png';

};

Milk.getAll = result => {
    sql.query("SELECT mi.name, mi.price as cost, m.name as description, s.size as weight, mi.image " +
        "FROM milk_products mi, market m, size s where mi.market_id = m.idMarket AND mi.size_id = s.idSize", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("vegetables_fruits: ", res);
        result(null, res);
    });
};

module.exports = Milk;