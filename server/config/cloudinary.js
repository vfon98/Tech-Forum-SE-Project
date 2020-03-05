const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'vfon98',
  api_key: '847525244271746',
  api_secret: 'txonq-rRTCfD_3vkvXRwn5sTNBw',
});

module.exports = {
  uploadImage(file) {
    if (!file) return;
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(file, {
          folder: 'avatars/',
        })
        .then(res => {
          // Remove file from local
          fs.unlinkSync(file);
          resolve({
            url: res.secure_url,
            public_id: res.public_id,
          });
        })
        .catch(err => {
          console.log('UPLOAD FAILED', err);
          reject(err);
        });
    });
  },
  destroyImage(public_id) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .destroy(public_id)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log('DESTROY FAILED', err);
          reject(err);
        });
    });
  },
};
