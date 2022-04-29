const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const i18n = require('./config/i18n');
require('./config/winston');
require("dotenv/config");

// create express app instance
const app = express();
global.config = require('./config/config');
global.models = require('./db/models');

// apply middlewares
app.use(cors());
app.use(morgan(global.config.MORGAN_LOGGING_MODE));
app.use(json());
app.use(urlencoded({ extended: true }));

/* Set Localisation  */
app.use(i18n.init);

app.use("/api/v1/", routes);


app.listen(global.config.PORT, () => {
    global.logger.info(`Server listening at port ${global.config.PORT}.`);
});