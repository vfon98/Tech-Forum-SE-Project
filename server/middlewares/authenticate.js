module.exports = function(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      error: 'Login required'
    })
  }
  console.log("AUTHENTICATED")
  next();
};
