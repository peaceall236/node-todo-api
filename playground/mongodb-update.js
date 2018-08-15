const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log("Connected to MongoDB Server");

    db.collection('Todos').findOneAndUpdate({
        text: 'eat lunch'
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

    // db.close();
});