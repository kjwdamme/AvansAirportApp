let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const PassengerModel = new Schema({
    PassengerId: {
        type: Number,
    },
    Name: {
        type: String,
    },
    Surname: {
        type: String,
    },
    Birthdate: {
        type: Date,
    }
});

module.exports = PassengerModel;