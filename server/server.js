const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
// newTodo.save().then((res) => {
//     console.log('Saved todo', res);
// }, (e) => {
//     console.log('Unable to save todo.');
// });

var newTodo = new Todo({
    text: 'Cook dinner',
    completed: true,
    completedAt: 123,
});
newTodo.save().then((res) => {
    console.log('Saved todo', res);
}, (e) => {
    console.log('Unable to save todo.');
});
