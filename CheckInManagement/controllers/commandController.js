checkIn = require('../models/commandModel');
const env = require('../config/env');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
//test
exports.new = function (req, res) {
    mongoose.connect(env.env.mongoWritehost, { useNewUrlParser: true })
    var db = mongoose.connection;

    db.once('open', function callback() {
        var checkin = new checkIn();

        checkin.passenger = req.body.passenger;
        checkin.flight = req.body.flight;
        checkin.email = req.body.email;
        checkin.checkedInDate = req.body.checkedInDate;

        checkin.save(function (err) {
            res.json({
                message: 'Check in created',
                data: checkin
            });

            mongoose.connection.close();
            mongoose.disconnect();
        })
    })
};

exports.sendCheckInNotice = function (receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AvansFlights@gmail.com',
            pass: '$Avans000'
        }
    });

    var mailOptions = {
        from: 'AvansFlights@gmail.com',
        to: receiver.email,
        subject: 'You can now check in',
        html: "<style> p { display: inline;} b {display: inline;} </style> <h1>You can now check in!</h1> <br> Click on the link below and if you have any questions, contact us at AvansFlights@gmail.com</p><br><br> <div><b>Your E-mail: </b> <p>" + receiver.email + "</p></div> <div><b>Passengers: </b> <p>" + receiver.passenger.length + "</p></div><div><b>Link: </b> <p>" + "localhost:32000/command/checkins/" + receiver._id + "</p></div>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

exports.checkin = function (req, res) {
    mongoose.connect(env.env.mongoWritehost, { useNewUrlParser: true })
    var db = mongoose.connection;
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).json({ "Error": "Invalid check in id" })
        return;
    } else {
        db.once('open', function callback() {
            checkIn.findById(req.params.id, function (err, data) {
                if (err) {
                    res.send(err);
                }

                if (data.checkedIn == false) {
                    var checkin = new checkIn();
                    checkin.passenger = data.passenger;
                    checkin.flight = data.flight;
                    checkin.email = data.email;
                    checkin.checkedIn = true;
                    checkin.checkedInDate = data.checkedInDate;

                    checkin.save(function (err) {
                        res.json({
                            message: 'Checked in!',
                            data: checkin
                        });
                        sendCheckInConfirmation(checkin);
                        mongoose.connection.close();
                        mongoose.disconnect();
                    })
                } else {
                    res.status(422).json({ "Error": "Already checked in" })
                }
            })
        })
    }
};

function sendCheckInConfirmation(receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AvansFlights@gmail.com',
            pass: '$Avans000'
        }
    });

    var mailOptions = {
        from: 'AvansFlights@gmail.com',
        to: receiver.email,
        subject: 'You have checked in!',
        html: "<style> p { display: inline;} b {display: inline;} </style> <h1>You succesfully checked in!</h1> <br> If you have any questions, contact us at AvansFlights@gmail.com</p><br><br> <div><b>Your E-mail: </b> <p>" + receiver.email + "</p></div> <div><b>Passengers: </b> <p>" + receiver.passenger.length + "</p></div>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};