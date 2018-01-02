const mongoose = require('mongoose');

let dbName = 'node-todo-api';
let dbUser = 'node-todo-api';
let dbPassword = 'node-todo-api';

mongoose.Promise = global.Promise;
/* alt
const db = mongoose.connect('mongodb://localhost:27017/TodoApp', { */
const db = mongoose.connect(process.env.MONGODB_URI || `mongodb://${dbUser}:${dbPassword}@ds239137.mlab.com:39137/${dbName}`, {

  useMongoClient: true
}).then((db) => {
  console.log('MongoDB is connected');
}).catch((error) => {
  console.log(error);
});

module.exports = {mongoose};
