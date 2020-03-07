module.exports = function(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Login required'
    });
  }
  console.log("AUTHENTICATED")
  next();
};
