const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'roiry25@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'access').toString()
    }]
}, {
    _id: userTwoId,
    email: 'peaceprivate@outlook.com',
    password: 'userTwoPass'
}]

const todos = [{
    _id: new ObjectID(),
    text: "First test to do"
}, {
    _id: new ObjectID(),
    text: "Second test to do"
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};


const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};


module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};