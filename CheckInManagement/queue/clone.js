const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://admin:admin123@ds343217.mlab.com:43217';
const dbName = 'readcheckin';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("creating read/write consistensy");

            const client = require('mongodb').MongoClient;
            client.connect({ useNewUrlParser: true }, function (err) {
                console.log("this is the error" + err)
                assert.equal(null, err);
                console.log("connected to server");

                const db = client.db(dbName)

                client.close();
            });
        }, 5000);
    }
};
