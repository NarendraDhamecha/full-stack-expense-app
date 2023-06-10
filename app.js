const express = require('express');
const app =  express();
const bodyparser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const expensesRoutes = require('./routes/expensesRoute');

app.use(cors());

app.use(bodyparser.json({extended: false}))

app.use('/expenses', expensesRoutes)

sequelize.sync()
.then(() => app.listen(3000))
.catch((err) => console.log(err));