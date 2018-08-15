const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log("Connected to MongoDB Server");

    // delete many
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((res) => {
    //     console.log(res);
    // });


    // delete one
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
    //     console.log(res);
    // });


    // find one and delete
    db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
        console.log(res);
    });

    // db.close();
});