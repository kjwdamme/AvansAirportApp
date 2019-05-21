let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const FlightModel = new Schema({
    planeId: {
        type: Number,
    },
    airlineId: {
        type: Number,
    },
    departureDate: {
        type: Date,
    },
    arrivalDate: {
        type: Date
    },
    delay: {
        type: Number,
    },
    destination: {
        type: String,
    },
    isArriving: {
      type: Buffer,
    }
});

//  const Flight = mongoose.model('Flight', FlightModel);

//  Flight.count({}, function (err, count) {
//  const Flight = new FlightModel({
//  PlaneId: 1,
//  AirlineId: 2,
//  ArrivalDate: '2019/05/15 16:35:00',
//  DepartureDate: '2019/05/15 15:30:00',
//  Delay: 5,
//  Destination: 'Bangkok',
//  IsArriving: 1
// })
//  .save();
//  });

module.exports = FlightModel;
