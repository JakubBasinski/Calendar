const Worker = require('../models/worker');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Calendar = require('../models/kalendar');
const worker = require('../models/worker');
const e = require('connect-flash');
// const bcrypt = require('bcryptjs')

exports.getMain = (req, res, next) => {
  let date1 = new Date('Janury 1, 2022 EDT');
  let date2 = new Date('December 31, 2022 EDT');
  let dateArray = [];
  let monthsArray = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  while (date1 <= date2) {
    dateArray.push(new Date(date1));
    date1 = date1.addDays(1);
  }
  // console.log(dateArray);
  const calendar = new Calendar({
    data: { days: dateArray, months: monthsArray },
  });

  Calendar.collection.countDocuments().then((e) => {
    if (e == 0) {
      calendar.save();
      res.render('main.ejs', {
        pageTitle: 'Witaj',
        path: '/',
      });
    } else {
      res.render('main.ejs', {
        pageTitle: 'Witaj',
        path: '/',
      });
    }
  });
};

exports.getCalendar = (req, res, next) => {
  const page = req.query.page;

  Worker.find().then((a) => {
    let workers = a;
    Calendar.find().then((e) => {
      let months = e[0].data.months[page];
      let date = e[0].data.days;
      let days = [];
      for (let day of date) {
        if (day.getMonth() == page) {
          days.push(day);
        }
      }

      // console.log(days);
      res.render('calendar.ejs', {
        isKieras: req.session.isKieras,
        isWorker: req.session.isWorker,
        workers: workers,
        days: days,
        months: months,
        pageTitle: 'Calendar',
        path: '/zlo',
      });
    });
  });
};

exports.getStrona = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  let inputmessage = req.flash('errorInput');
  if (inputmessage.length > 0) {
    inputmessage = inputmessage[0];
  } else {
    inputmessage = null;
  }

  Worker.find()
    .then((workers) => {
      res.render('kieras.ejs', {
        workers: workers,
        pageTitle: 'Kieras',
        path: '/',
        errorMessage: message,
        inputMessage: inputmessage,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLoginKieras = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('loginkieras.ejs', {
    pageTitle: 'Kierownik Login',
    path: '/loginkieras',
    errorMessage: message,
    // isKieras: true
  });
};

exports.postLoginKieras = (req, res, next) => {
  const imieKieras = req.body.imieKieras;
  const emailKieras = req.body.emailKieras;
  const hasloKieras = req.body.hasloKieras;

  if (
    imieKieras == 'Daniel' &&
    emailKieras == 'kieras@gmail.com' &&
    hasloKieras == 'secret'
  ) {
    req.session.isKieras = true;
    res.redirect('/kieras');
  } else {
    req.flash('error', 'You are not Daniel');
    return req.session.save((err) => {
      res.redirect('/loginkieras');
    });
  }
};

exports.postAddWorker = (req, res, next) => {
  const imie = req.body.imie;
  const nazwisko = req.body.nazwisko;
  const color = req.body.kolor;
  if (!imie || !nazwisko || !color) {
    req.flash('errorInput', `Wszystkie pola sa wymagane`);
    return req.session.save((err) => {
      res.redirect('/kieras');
    });
  } else {
    Worker.findOne({ nazwisko: nazwisko }).then((worker) => {
      if (!worker) {
        const worker = new Worker({
          imie: imie,
          nazwisko: nazwisko,
          color: color,
          wizyty: [],
          _id: mongoose.Types.ObjectId(),
        });
        worker
          .save()
          .then((result) => {
            res.redirect('/kieras');
          })
          .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
      } else {
        req.flash('error', `Juz jest jeden pracownik o nazwisku ${nazwisko}`);
        return req.session.save((err) => {
          res.redirect('/kieras');
        });
      }
    });
  }
};

exports.postDeleteWorker = (req, res, next) => {
  const id = req.body.id;
  Worker.findOneAndRemove({ _id: id }).then(() => {
    res.redirect('/kieras');
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
