const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useMongoClient: true
}).then((db) => {
  console.log('MongoDB is connected');
}).catch((error) => {
  console.log(error);
});

module.exports = {mongoose};
