const express = require('express');
const path = require('path');

const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use('/', express.static(path.join(__dirname,'/dist/users-project')));

app.use('/api/users', userRoute);

module.exports = app;