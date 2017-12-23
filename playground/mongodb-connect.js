/* alt
const MongoClient = require('mongodb').MongoClient; */
const {MongoClient, ObjectID} = require('mongodb');

/* eigenes ObjectID erstellen
var obj = new ObjectID();
console.log(obj); */

/* ES6 Destructering
var user = {
  name: 'jay',
  age: 32
}
var {name} = user;
console.log(name); */

MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // /* Update for 3.00 */
  // const myDB = db.db('TodoApp');
  //
  // /* alt
  // db.collection('Todos').insertOne({ */
  // myDB.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  /* Challenge: Insert new doc into Users (name, age, location)
  Insert */
  // const myDB = db.db('TodoApp');
  //
  // myDB.collection('Users').insertOne({
  //   name: 'jay',
  //   age: 32,
  //   location: 'vienna'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert User', err);
  //   }
  //
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
    // console.log(result);
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
