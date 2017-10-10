const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8000;

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout:'master' }));
app.set('view engine', 'handlebars');

// Load User Model
require('./models/User');

/* ---------- Passport Config ---------- */
require('./config/passport')(passport);

/* ---------- Load Routes ---------- */
const auth = require('./routes/auth');

/* ---------- Load Index ---------- */
const index = require('./routes/index');

/* ---------- Load Keys File ---------- */
const keys = require('./config/keys');

/* ---------- Mapp global promise ---------- */
mongoose.Promise = global.Promise;

/* ---------- Mongoose Connect ---------- */
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
})
  .then(() => { console.log('MongoDB Connected..'); })
  .catch((err) => { console.log(err); });

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/* ---------- Use Routes ---------- */
app.use('/', index);
app.use('/auth', auth);


app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});