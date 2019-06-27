const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://Admin:Password123@ds343217.mlab.com:43217';
const dbName = 'readatc';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("Creating consistensy...");

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
