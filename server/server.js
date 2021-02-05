const express = require('express');
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(express.static('public'));
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
    console.log("Hello everyone");
});

const userRoutes = require("./modules/users/routes/user.route");
const itemRoutes = require("./modules/items/routes/item.route");
app.use("/user", userRoutes);
app.use("/user", itemRoutes);

const port = process.env.PORT || 4444;

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
