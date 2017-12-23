/* alt
const MongoClient = require('mongodb').MongoClient; */
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const myDB = db.db('TodoApp');

  /* deleteMany
  myDB.collection('Todos').deleteMany({
    text: 'Eat lunch'
  }).then((result) => {
    console.log(result);
  }); */

  /* deleteOne
  myDB.collection('Todos').deleteOne({
    text: 'Eat lunch'
  }).then((result) => {
    console.log(result);
  }); */

  /* findOneAndDelete
  myDB.collection('Todos').findOneAndDelete({
    completed: false
  }).then((result) => {
    console.log(result);
  }); */

  /* Challenge: delete all duplicates with name: jay
  myDB.collection('Users').deleteMany({
    name: 'jay'
  }).then((result) => {
    console.log(result);
  }); */

  // Challenge: delete mike with a special id
  myDB.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a3c1b2d54c730029c89c166')
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
