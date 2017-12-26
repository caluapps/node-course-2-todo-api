// library import
const express = require('express');
const bodyParser = require('body-parser');

// local import
const {mongoose} = require('./db/mongoose.js');

/* Challenge: new model for users, authentication, email, password and todos
associated with user */

/*
var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
}); */

/* Challenge: Make new todo with all 3 options
var challengeTodo = new Todo({
  text: 'Finish nodejs course',
  completed: true,
  completedAt: 123
  text: '12'
});*/

/*
challengeTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo');
});*/

/*
var user = new User({
  email: 'office@calu-apps.at'
});

user.save().then((doc) => {
  console.log('User saved', doc);
}, (e) => {
  console.log('Unable to save user', e);
});
*/

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

// CRUD
app.post('/todos', (req, res) => {
  console.log(req.body);
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
