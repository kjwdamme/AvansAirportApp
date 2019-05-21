let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const FlightModel = require('./flight.model');

const ScheduleModel = new Schema({
    flight: {
        type: FlightModel
    },
    landingStrip:{
        type: Number
    }


});

//  const Schedule = mongoose.model('Schedule', ScheduleModel);

//  Schedule.count({}, function (err, count) {
//  const Schedule = new FlightModel({
//  Flight:({AirlineId: 2, ArrivalDate: '2019/05/15 16:35:00', DepartureDate: '2019/05/15 15:30:00', Delay: 5, Destination: 'Bangkok', IsArriving: 1}),    
//  LandingStrip: 3
// })
//  .save();
//  });

module.exports = ScheduleModel;
