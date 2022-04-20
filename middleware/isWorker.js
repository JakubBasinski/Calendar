module.exports = (req, res, next) => {
    if (!req.session.isWorker) {
      return res.redirect('/');
    }
    next();
  };
  
  