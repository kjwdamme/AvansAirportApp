let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to BorderSecurity',
    });
});

var readController = require('../controllers/readController');

router.route('/events')
    .get(readController.index);
 
router.route('/events/:id')
    .get(readController.viewByID);

router.route('/events/flight/:id')
    .get(readController.viewByFlightID);    

module.exports = router;