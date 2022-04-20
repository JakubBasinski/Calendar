module.exports = (req, res, next) => {
  if (!req.session.isKieras) {
    return res.redirect('/');
  }
  next();
};

