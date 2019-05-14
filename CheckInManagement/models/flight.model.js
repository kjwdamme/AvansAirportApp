let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const FlightModel = new Schema({
    PlaneId: {
        type: Number,
    },
    AirlineId: {
        type: Number,
    },
    DepartureDate: {
        type: Date,
    },
    Delay: {
        type: Number,
    },
    Destination: {
        type: String,
        required: [true, 'Which match day is it?']
    },
    IsArriving: {
      type: Buffer,
    }
});

const flight = mongoose.model('plane', FlightModel);

flight.count({}, function (err, count) {
 console.log('vlucht toevoegen');
 const Plane = new PlaneModel({
 PlaneId: 1,
 AirlineId: 2,
 DepartureDate: '2019/05/15 15:30:00',
 Delay: 5,
 Destination: 'Bangkok',
 IsArriving: 1
})
 .save();
 });

module.exports = FlightModel;