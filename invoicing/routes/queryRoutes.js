let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to invoices',
    });
});

var queryController = require('../controllers/queryController');

router.route('/invoices')
    .get(queryController.index);

router.route('/invoices/:invoice_id')
    .get(queryController.view);
 
    module.exports = router;