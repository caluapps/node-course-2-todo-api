const mongoose = require('mongoose');

// model
let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
