var env = process.env.NODE_ENV || 'development';
console.log('env *******', env);

if (env == 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapp';
} else if (env == 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todotest';
}


const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const jwt = require('jsonwebtoken');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            res.status(404).send();
        }
    }).catch((e) => res.status(400).send());
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // console.log('first log ', user);
        var access = 'auth';
        var token = jwt.sign({_id: user._id.toHexString(), access}, 'access').toString();
        user.tokens.push({access, token});
        return User.findByIdAndUpdate(user._id, {$set: user}, {new: true}).then((user) => {
            res.header('x-auth', token).send(user);
        });
        // user.generateAuthToken().then((token) => {
        //     res.header('x-auth', token).send(user);
        // });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/users/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => res.status(200).send(),
     () => res.status(400).send());
});


app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

module.exports = {app};