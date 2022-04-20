module.exports = (req, res, next) => {
  if (!req.session.isKieras && !req.session.isWorker) {
    return res.redirect('/');
  }
  next();
};
