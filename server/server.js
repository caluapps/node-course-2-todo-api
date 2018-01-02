// library import
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

/*  */
app.use(bodyParser.json());

// Create todo
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

// Get all
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
});

// Challenge: GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  // res.send(req.params);

/* Challenge:
    validate id
      - 404 - send back empty body
    findById - take id and query the collection looking for a matching document
      - success
        - if todo - send it back
        - if no todo - send back 404, with empty body
      - error
        - 400 - send empty body back, because could contain privat information */

  /* einfache Methode die Gültigkeit einer Id zu überprüfen */
  /* Wenn id nicht gültig */
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  /* Suchen nach todo ID, wenn id gültig */
  Todo.findById(id).then((todo) => {
    /* Wenn id gültig aber im doc nicht vorhanden */
    if (!todo) {
      return res.status(404).send();
    }

    /* Wenn id gültig und vorhanden */
    res.status(200).send({todo});

  /* z.B. Wenn Datenbank nicht erreichbar */
  }).catch((e) => {
    res.status(400).send();
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app}
