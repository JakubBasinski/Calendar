const express = require('express');
const path = require('path');
const kierasRoutes = require('./routes/kieras');
const workerRoutes = require('./routes/worker');
const caledarRoutes = require('./routes/calendar');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./models/kieras');

const MONGODB_URI = 'mongodb://mongodb:27017/kalendarz';

// const MONGODB_URI =
//   'mongodb+srv://Manior:*****@pierwszycluster.ram8q.mongodb.net/danielProjekt?authSource=admin&replicaSet=atlas-cx3nkc-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, '/public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(kierasRoutes);
app.use(workerRoutes);
app.use(caledarRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const kieras = new User({
          name: 'Daniel',
          email: 'kieras@gmail.com',
          password: 'secret',
        });

        kieras.save();
      }
    });

    app.listen(3030);
  })
  .catch((err) => {
    console.log(err);
  });
