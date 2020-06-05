const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use('/style', express.static('./public/styles/dist/'));
app.use('/img', express.static('./public/images/'));
app.use('/js', express.static('./public/scripts/dist/'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});


require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});