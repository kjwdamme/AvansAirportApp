let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'API Online, Welcome to BorderSecurity',
    });
});

var writeController = require('../controllers/writeController');

router.route('/events')
    .post(writeController.new);
 
    module.exports = router;