/* alt
const MongoClient = require('mongodb').MongoClient; */
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const myDB = db.db('TodoApp');

  /*
  myDB.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a3eca6403457976539035e1')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }); */

  // Challenge - change name Jen to jay in users collection
  myDB.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a3c1a9cd6ffb0029bff4c56')
  }, {
    $set: {
      name: 'jay'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
