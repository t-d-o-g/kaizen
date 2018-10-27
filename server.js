// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
// const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());

app.use(expressSession({ 
  secret: 'keyboard cat',
  resave: true, 
  saveUninitialized: true,
  secure: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Static directory
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require('./routes/index')(app);
require('./routes/post-api-routes.js')(app);
// VIK_TODO: Find out how to enable it in development mode only
require('./routes/api-seed.js')(app);
require('./routes/ticketxrefs-api-routes.js')(app);
require('./routes/users-api-routes.js')(app);
require('./routes/status-api-routes.js')(app);
require('./routes/category-api-routes.js')(app);
require('./routes/tickets-api-routes.js')(app);
require('./routes/locations-api-routes.js')(app);
require('./routes/login-routes.js')(app, passport);

// require('./routes/confirmation_bu')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});