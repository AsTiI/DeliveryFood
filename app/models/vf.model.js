const sql = require("./db.js");

// constructor
const Vegetables_fruits = function(vegetables_fruits) {
    this.name = vegetables_fruits.name;
    this.weight = vegetables_fruits.weight;
    this.description = vegetables_fruits.description;
    this.cost = vegetables_fruits.cost;
    this.image = vegetables_fruits.image || 'img/pomidor.png';
    this.shopping_basket = '../public/images/shopping_basket.png';

};

Vegetables_fruits.getAll = result => {
    sql.query("SELECT v.name, v.weight, v.cost, v.image, m.name AS description FROM vegetables_fruits v, market m where v.market_id = m.idMarket", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("vegetables_fruits: ", res);
        result(null, res);
    });
};

module.exports = Vegetables_fruits;