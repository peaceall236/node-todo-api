const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log("Connected to MongoDB Server");

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // db.close();
});