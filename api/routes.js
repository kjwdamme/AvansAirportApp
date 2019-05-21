var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Tower = require('../models/tower.model')
var Flight = require('../models/flight.model')
var Schedule = require('../models/schedule.model')


// Return a list with all 
routes.get('/towers', function (req, res) {
    res.contentType('application/json');

    Tower.find({})
      .then(function (towers) {
        res.status(200).json(towers);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
});




// Return a show with id


routes.get('/towers/:id', function(req, res) {
  res.contentType('application/json');

  var id = req.params.id;

  Tower.findOne({_id: id})
    .then(function (tower) {
      res.status(200).json(tower);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


// Add a Tower.


routes.post('/towers', function (req, res) {
    res.contentType('application/json');

    var body = req.body;

    Tower.create(body, function(err, tower) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(tower);
        }
    });
});


// Update an existing Tower


routes.put('/towers/:id', function (req, res) {
    var towerId = req.params.id;
    var body = req.body;
    Tower.findOneAndUpdate({
        _id: towerId
    }, {$set: {
        permission: body.permission, 
        Schedule: {
          landingStrip: body.Schedule.landingStrip,
          flight: {
              planeId: body.Flight.planeId,
              airlineId: body.Flight.airlineId,
              departureDate: body.Flight.departureDate,
              arrivalDate: body.Flight.arrivalDate,
              delay: body.Flight.delay,
              destination: body.Flight.destination,
              isArriving: body.Flight.isArriving

          }
          
        },
    }}).then(function (tower) {
        res.status(200). json(tower);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

// Delete an Tower


routes.delete('/towers/:id', function (req, res) {
    var towerId = req.params.id;

    Tower.findOneAndRemove({ _id: towerId})
        .then(function (tower) {
            res.status(200).json({"response": "Successfully deleted"});
        }).catch((error) => {
        res.status(400).json(error);
    })
});

module.exports = routes;