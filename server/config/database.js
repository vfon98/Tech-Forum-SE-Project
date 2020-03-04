const mongoose = require('mongoose');

const dbURI =
  'mongodb+srv://covid-forum:yV5GvSYEZwgA7WkC@cluster0-g0kfh.mongodb.net/covid_forum?retryWrites=true&w=majority';

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
