const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');
const path = require('path');
const db = require('./database.js');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const userRoute = require('./routes/userRoute');

const app = express();

const store = new KnexSessionStore({
    knex: db.knex,
    tablename: 'sessions'
});

app.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { sameSite: "none", secure: true },
    })
);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/dist/users-project')));

app.use('/api/users', userRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is listening on..' + process.env.PORT || 3000);
})