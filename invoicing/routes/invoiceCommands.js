let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to invoices',
    });
});

var contactController = require('../controllers/commandController');

router.route('/invoices')
    .post(contactController.new);

router.route('/invoices/:invoice_id')
    .patch(contactController.update)
    .put(contactController.update);
 
    module.exports = router;