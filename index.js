require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./lib/db')();
const logger = require('./lib/logger');
// const userRoutes = require('./routers/auth_code');
const userRoutes = require('./routers/user');
const activityRoutes = require('./routers/activity');
const gift_temp = require('./routers/gift_temp')

app.use('/v1/user', userRoutes)
app.use('/v1/activity', activityRoutes)
app.use('/v1/gift',gift_temp)

app.listen(port, () => {
    logger.info(`Server running at ${port}`);
});