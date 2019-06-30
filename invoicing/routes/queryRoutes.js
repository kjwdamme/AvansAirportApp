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
    .get(queryController.viewByID);

router.route('/invoices/email/:email')
    .get(queryController.viewByEmail);

router.route('/invoices/opencosts/:email')
    .get(queryController.getOpenCosts);

router.route('/invoices/totalcosts/:email')
    .get(queryController.getTotalCosts);

router.route('/invoices/paidcosts/:email')
    .get(queryController.getPaidCosts);

module.exports = router;