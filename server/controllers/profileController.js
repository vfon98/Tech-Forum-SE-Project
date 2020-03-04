module.exports = {
  getProfile(req, res) {
    res.status(200).json({ profile: req.user })
  }
}