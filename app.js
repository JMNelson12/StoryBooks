const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Load Models
require('./models/User');
require('./models/Story');

/* ---------- Passport Config ---------- */
require('./config/passport')(passport);

/* ---------- Load Routes ---------- */
const auth = require('./routes/auth');
/* ---------- Load Index ---------- */
const index = require('./routes/index');
/* ---------- Load Stories ---------- */
const stories = require('./routes/stories');

/* ---------- Load Keys File ---------- */
const keys = require('./config/keys');

// Handlebars Helpers
const {
  truncate,
  stripTags,
  formatDate
} = require('./helpers/hbs');

// Handlebars Middleware
app.engine('handlebars', exphbs({ helpers:{
  truncate: truncate,
  stripTags: stripTags,
  formatDate: formatDate
}, defaultLayout:'master' }));
app.set('view engine', 'handlebars');

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

// Set static folder !for public folder
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- Use Routes ---------- */
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});