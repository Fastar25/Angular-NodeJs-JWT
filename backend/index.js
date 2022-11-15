const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./dbconnection');

const routes = require('./router/router')

db.connect((err) => {
    err ? console.log('connexion echouée') : console.log('connexion reussie')

});

app.use(bodyparser.json())
app.use('/api', routes);


app.listen(3000, (err) => {
    if (err) throw err;
    console.log('server running');
})