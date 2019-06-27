let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Kaas',
    });
});

var readController = require('../controllers/readController');

router.route('/events')
    .get(readController.index);
 
    module.exports = router;