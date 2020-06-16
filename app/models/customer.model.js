const sql = require("./db.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
/*
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
 */


// constructor
const Customer = function(customer) {
    this.name = customer.name;
    this.surname = customer.surname;
    this.patronymic = customer.patronymic;
    this.address = customer.address;
    this.phone = customer.phone;
    this.mail = customer.mail;
    this.password = customer.password;
};

Customer.create = (newCustomer, result) => {
    bcrypt.hash(newCustomer.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        sql.query(`INSERT INTO customer SET name='${newCustomer.name}', surname='${newCustomer.surname}',patronymic='${newCustomer.patronymic}',address='${newCustomer.address}',phone='${newCustomer.phone}' ,mail='${newCustomer.mail}' ,password='${hash}'`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
            /*
            result(null, {
                id: res.insertId, ...newCustomer
            });
             */

        });
    });


};

Customer.compare = (newCustomer, result) => {
    sql.query(`SELECT mail, phone FROM customer`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        for (let i = 0; i < res.length; i++) {
            if (newCustomer.mail === res[i].mail) {
                console.log('МЫЛО НЕ ПРАВИЛЬНОЕ!!!');
                result(null, null);
                return;
            }
            if (newCustomer.phone === res[i].phone)
            {
                console.log('ТЕЛЕФОН УЖЕ ЗАРЕГАН');
                result(null, null);
                return;
            }
        }
    })
};

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
Customer.findByPhone = (phone, result) => {
    sql.query(`SELECT phone,password FROM customer WHERE phone = ${phone}`, (err, res) => {
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

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customer WHERE id = ${customerId}`, (err, res) => {
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