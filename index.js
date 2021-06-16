const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const db = require("./models");
require("dotenv").config();

// create express app instance
const app = express();

// apply middlewares
app.use(cors());
app.use(morgan(process.env.MORGAN_LOGGING_MODE));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1/", routes);

// connect to the mysql server and starting listening to the app server
db.sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening at port ${process.env.PORT}.`);
        })
    })
    .catch((err) => {
        console.log("Error in connecting databse", err);
        process.exit(1);
    })