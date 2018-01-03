const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/* Todo.remove({}) - to remove all send empty object
Todo.remove({}).then((result) => {
  console.log(result);
}); */

/* work like findOne
    - matches very first Document and remove it
    - it takes query object
Todo.findOneAndRemove({_id: '5a4cc5d62b10421db474b377'}).then((todo) => {
  console.log(todo);
}); */

// works by finding the id
Todo.findByIdAndRemove('5a4cc5d62b10421db474b377').then((todo) => {
  console.log(todo);
});
