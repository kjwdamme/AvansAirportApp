const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://admin:admin123@ds343217.mlab.com:43217';
const dbName = 'readcheckin';
const client = new MongoClient(url);

module.exports = {
    scheduleCloneJob: function () {
        setInterval(function () {
            console.log("creating read/write consistensy");
        }, 5000);
    }
};
