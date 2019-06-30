const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://Admin:Password123@ds343217.mlab.com:43217';
const dbName = 'readatc';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("clone write to read database");
        }, 300000);
    }
};