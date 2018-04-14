// NPM Requirements
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); // Can also use express-session to store our user session data
// (cookie session stores user data, express session stores session_data which references a user)
// If you need to store lots of data in session, use express-session. Else use cookie-session

// Local Requirements
const keys = require('./config/keys');
require('./models/User'); // This must come before /services/passport where we use the model
require('./models/Survey');
require('./services/passport');

// Connect mongoose to our mongoDB
mongoose.connect(keys.mongoURI);

// Launches a new app with the express command
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, // Milliseconds in 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route Handling
require('./routes/authRoutes')(app); // Calls routes function with app
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Used to make express work in a production env
if (process.env.NODE_ENV === 'production') {
  // Makes sure express serves up production assets (like main.js/.css)
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server set up
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
