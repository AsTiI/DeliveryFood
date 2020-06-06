const sql = require("./db.js");

// constructor
const Customer = function(customer) {
    this.name = customer.name;
    this.surname = customer.surname;
    this.patronymic = customer.patronymic;
    this.address = customer.address;
    this.phone = customer.phone;
    this.password = customer.password;
};

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

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

/*
Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM заказчик WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};


 */



Customer.getAll = result => {
    sql.query("SELECT * FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
};



/*
Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
        [customer.email, customer.name, customer.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { id: id, ...customer });
            result(null, { id: id, ...customer });
        }
    );
};
 */

/*
Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

 */
/*
Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

 */

module.exports = Customer;
module.exports = Vegetables_fruits;