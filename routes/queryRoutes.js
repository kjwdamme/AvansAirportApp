let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to ATC',
    });
});

var queryController = require('../controllers/queryController');

router.route('/atcs')
    .get(queryController.index);

router.route('/atcs/:atc_id')
    .get(queryController.viewById);
 
    module.exports = router;


