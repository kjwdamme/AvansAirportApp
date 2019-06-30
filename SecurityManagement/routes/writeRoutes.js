let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Kaas',
    });
});

var writeController = require('../controllers/writeController');

router.route('/events')
    .post(writeController.new);
 
    module.exports = router;