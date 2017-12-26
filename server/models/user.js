const mongoose = require('mongoose');

var User = mongoose.model('User', {
/*name: {
    type: String,
    required: true,
    minLength: 1
  },
  token: {
    type: String,
    required: true,
    minLength: 1
  },*/
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }/*,
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  todoList: {
    type: String,
    required: false
  }*/
});

module.exports = {User};
