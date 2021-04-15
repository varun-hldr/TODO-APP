const {MongoClient} = require('mongodb');
const {mongodb} = require('./config/keys');

// const uri = "mongodb+srv://admin:AdminUser123@cluster0.i5gbr.mongodb.net/todo?retryWrites=true&w=majority";

function initialize(
    dbName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(mongodb.dbURI, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            // const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbObject);
        }
    });
}

module.exports = {
    initialize
};