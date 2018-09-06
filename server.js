// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require('./routes/index')(app);
require('./routes/tickets')(app);
require('./routes/post-api-routes.js')(app);
// VIK_TODO: Find out how to enable it in development mode only
require('./routes/api-seed.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
