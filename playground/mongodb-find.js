/* alt
const MongoClient = require('mongodb').MongoClient; */
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const myDB = db.db('TodoApp');

  /* Bestimmten Eintrag finden */
  // myDB.collection('Todos').find({
  //   // completed: false
  //   _id: new ObjectID('5a3cf24bd21403643b4e981b')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  /* Docs zählen
  myDB.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  }); */

  /* Challenge: Alle Einträge mit dem Namen Jay filtern und ausgeben */
  myDB.collection('Users').find({
    name: 'jay'
  }).toArray().then((docs) => {
    console.log('Users:');
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.close();
});
