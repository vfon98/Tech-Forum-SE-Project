const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection established!');
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
