const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
// const {MongoClient, ObjectID} = require('mongodb');
// var id = new ObjectID();
// console.log(is);

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log("Connected to MongoDB Server");

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err)
    //         return console.log('Unable to insert todo', err);
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Alliance Peace',
        age: 23,
        location: "kn 123st 133"
    }, (err, res) => {
        if (err)
            return console.log('Unable to insert todo', err);
        console.log(JSON.stringify(res.ops, undefined, 2));
    });

    db.close();
});