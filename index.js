const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

//setting up connection to mongoDB server
const url = 'mongodb://localhost:27017/';

//name of database we want to connect to 
const dbname = 'nucampsite';

//allows us to connect the mongo client w/the server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    
    //check to make sure error isn't null
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    //#1. Delete everything that's in the campsites collection of the `nucampsite` db
    //#2. Insert a document into that collection using the `find` method
    //dropping a db = delete a db 
    db.dropCollection('campsites', (err, result) => {
        //asset that error is not null 
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //recreate `campsites` db
        const collection = db.collection('campsites');

        //insert a document
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);

            //`ops` is a property short for operations
            console.log('Insert Document:', result.ops);

            //The find() method returns all occurrences in the selection.
            //The toArray() method converts documents to an array of objs so we can console log it. 
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});