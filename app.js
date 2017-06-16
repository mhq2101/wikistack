const sequelize = require('sequelize');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./routes')
let app = express();

//template boilerplate setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html')
nunjucks.configure('views',{ noCache: true })

app.use(morgan('dev'));

//body parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

models.db.sync({force: true}).then(() => {
    app.listen(3000, () => {
        console.log('yo server be listenin on 3000');
    });
})
.catch(console.error);

app.use('/', routes);


