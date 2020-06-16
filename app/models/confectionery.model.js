const sql = require("./db.js");

// constructor
const Confectionery = function(confectionery) {
    this.name = confectionery.name;
    this.weight = confectionery.weight;
    this.description = confectionery.description;
    this.cost = confectionery.cost;
    this.image = confectionery.image;
    this.shopping_basket = '../public/images/shopping_basket.png';

};

Confectionery.getAll = result => {
    sql.query("SELECT c.name, c.count as weight, c.price as cost, m.name as description, c.image " +
        "FROM confectionery c, market m where c.market_id = m.idMarket", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("vegetables_fruits: ", res);
        result(null, res);
    });
};

module.exports = Confectionery;