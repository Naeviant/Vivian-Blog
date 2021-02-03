const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const nunjucksDate = require("nunjucks-date");

const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const viewsRoutes = require('./routes/views');

app.all('*', (req, res, next) => {
    if (req.session.auth) res.locals.auth = true;
    next();
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/', viewsRoutes);

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

markdown.register(env, marked);
nunjucksDate.setDefaultFormat("ddd Do MMM YYYY");
nunjucksDate.install(env);

app.get('/404', (req, res) => {
    res.render('404.njk');
});

app.get('*', (req, res) => {
    res.redirect('/404');
});

app.listen(config.PORT, () => {
    console.log('Listening on Port %d', config.PORT)
});