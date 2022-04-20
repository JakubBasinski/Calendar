const Worker = require('../models/worker');

exports.getWorkerPage = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  let message1 = req.flash('errorDzien');
  if (message1.length > 0) {
    message1 = message1[0];
  } else {
    message1 = null;
  }

  const nazwisko = req.params.nazwisko;

  Worker.findOne({ nazwisko: nazwisko }).then((worker) => {
    res.render('worker.ejs', {
      worker: worker,
      pageTitle: 'DO ROBOTY!',
      path: '/worker',
      errorMessage: message,
      errorDzien: message1,
      nazwisko: nazwisko,
    });
  });
};

exports.postDeleteWorker = (req, res, next) => {
  const nazwisko = req.body.nazwisko;
  const wizyta = req.body.idWizyta;
  const filter = { nazwisko: nazwisko };
  Worker.findOne(filter).then((worker) => {
    worker.wizyty = worker.wizyty.filter((e) => {
      return e._id.toString() !== wizyta.toString();
    });

    worker.save();
    console.log('znowu obiekt?' + worker.wizyty);
    res.redirect('back');
  });
  // console.log(wizyta);
};

exports.getLoginWorker = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('loginworker.ejs', {
    pageTitle: 'Cieciuch',
    path: '/',
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const nazwisko = req.body.nazwisko;
  Worker.findOne({ nazwisko: nazwisko }).then((worker) => {
    if (!worker) {
      req.flash('error', 'You shall not pass');
      return req.session.save((err) => {
        res.redirect('/loginworker');
      });
    } else {
      req.session.isWorker = true;
      req.session.workerName = nazwisko;
      res.redirect(`/worker/${nazwisko}`);
    }
  });
};

exports.postWizyta = (req, res, next) => {
  const nazwisko = req.body.nazwisko;
  const klient = req.body.klient;
  const dataWizyty = req.body.year;

  const filter = { nazwisko: nazwisko };
  // const update = { 'wizyty.$.data': dataWizyty };

  Worker.findOne(filter).then((worker) => {
    let arrayCheck = worker.wizyty;
    let dataCheck = [];

    let dzionek = new Date(dataWizyty);
    if (dzionek.getDay() == 6 || dzionek.getDay() == 0) {
      req.flash('errorDzien', `Do not work on weekend!`);
      return req.session.save((err) => {
        res.redirect('back');
      });
    } else {
      arrayCheck.forEach((e) => {
        let rok = e.data.getFullYear();
        let miesiac = e.data.getMonth() + 1;
        let dzien = e.data.getDate();
    
        if (`${rok}-0${miesiac}-${dzien}` == dataWizyty) {
          console.log('TAK');
          dataCheck.push('jajko');
          console.log(dataCheck);
        }
      });

      if (dataCheck.length > 0) {
        req.flash('error', `Juz pracujesz tego dnia`);
        return req.session.save((err) => {
          dataCheck = [];
          res.redirect('back');
        });
      } else {
        const wizyta = { data: dataWizyty, klient: klient };
        worker.wizyty.push(wizyta);
        worker.save();
        res.redirect('back');
      }
    }
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
