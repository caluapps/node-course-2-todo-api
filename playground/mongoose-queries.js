const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/* einfache Methode die Gültigkeit einer Id zu eruieren
let id = '5a4664098b287a048005002811';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
}*/

/* Findet anhand einer ID eine bestimmte Todo *//*
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});*/

/* Ähnlich wie .find() mit dem einen Unterschied, dass bei mehereren Ergebnisse
    das zurückgegeben wird, welches am ehesten den Kriterien passt *//*
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});*/

/* Suchen nach ID *//*
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => {
  console.log(e);
});*/

/* Challenge: query users collection
    use: User.findById
    3 cases:  1) Query works but no user, Print 'user not found'
              2) user was found, print user to screen
              3) handle any errors, print error object to screen */
let id = '5a3fee84ee039706b355ed71';

User.findById(id).then((user) => {
  if (!user) {
    return console.log('Unable to find User');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log(e);
});
