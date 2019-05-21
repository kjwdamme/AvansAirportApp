let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const FlightModel = require('./flight.model');
const ScheduleModel = require('./schedule.model');

const TowerModel = new Schema({
    schedule: {
        type: ScheduleModel
    },
    flight:{
        type: FlightModel
    },
    permission: {
        type: Boolean}
   
});

 const Tower = mongoose.model('tower', TowerModel);

// //   Tower.count({}, function (err, count) {
//  const tower = new Tower({
//  Schedule:({ LandingStrip: 3, Flight:({PlaneId: 1, AirlineId: 2, ArrivalDate: '2019/05/15 16:35:00', DepartureDate: '2019/05/15 15:30:00', Delay: 5, Destination: 'Bangkok', IsArriving: 1}),
// }),
// //  Flight:({PlaneId: 1, AirlineId: 2, ArrivalDate: '2019/05/15 16:35:00', DepartureDate: '2019/05/15 15:30:00', Delay: 5, Destination: 'Bangkok', IsArriving: 1}),
//  Permission: true
// })
//  .save();
//   });





module.exports = Tower;