const sql = require("./db.js");

// constructor
const MFS = function(mfs) {
    this.name = mfs.name;
    this.weight = mfs.weight;
    this.description = mfs.description;
    this.cost = mfs.cost;
    this.image = mfs.image || 'img/pomidor.png';
    this.shopping_basket = '../public/images/shopping_basket.png';

};

MFS.getAll = result => {
    sql.query("SELECT v.name, v.weight, v.cost, v.image, m.name AS description FROM meat_fish_sausages v, market m where v.market_id = m.idMarket", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = MFS;