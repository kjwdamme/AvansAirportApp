const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://admin:Admin0@ds060749.mlab.com:60749';
const dbName = 'readinvoice';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("This would clone write to read database.");
        }, 300000);
    }
};
