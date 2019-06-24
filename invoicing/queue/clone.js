const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://admin:Admin0@ds060749.mlab.com:60749';
const dbName = 'readinvoice';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("Creating read/write consistensy...");

            const client = require('mongodb').MongoClient;
            client.connect({ useNewUrlParser: true }, function(err) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
              
                const db = client.db(dbName);
              
                client.close();
              });
        }, 5000);
    }
};
