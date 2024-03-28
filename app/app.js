const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./Routes');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MONGODB CONNECTION
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true }).then(() =>
    console.log('MongoDB conected ...')
).catch(err => 
    console.log(err)
);

app.get('/', (req, res) => { res.send('This is Express API') });
app.use(routes);

module.exports = app;
