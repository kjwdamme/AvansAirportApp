let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to invoices',
    });
});

var contactController = require('../controllers/queryController');

router.route('/invoices')
    .get(contactController.index);

router.route('/invoices/:invoice_id')
    .get(contactController.view);
 
    module.exports = router;