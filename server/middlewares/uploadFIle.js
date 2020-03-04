const multer = require('multer');
const upload = multer({ dest: '../uploads/avatars/' });

module.exports = upload.single('avatar');