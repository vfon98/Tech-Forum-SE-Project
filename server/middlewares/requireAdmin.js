module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({
      error: 'Require admin permission!',
    });
  }
  next();
};
