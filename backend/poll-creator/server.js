const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const routes = require('./routes/routes');
const keys = require('./config/keys');
const server = express();

// Connect DB
mongoose.connect(keys.mongoURI);
require('./config/passport')(passport);

//Static folder
server.use(express.static(path.join(__dirname, 'public')));

// MW
server.engine('handlebars', exphbs({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(methodOverride('_method'));
server.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

//Global vars
server.use((req, res, next) => {
    //Custom messages
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    //Passport errors
    res.locals.error = req.flash('error');

    // Sessions
    res.locals.user = req.user || null;
    next();
});

// Routing
server.use('/', routes);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Running on port ${port}`));