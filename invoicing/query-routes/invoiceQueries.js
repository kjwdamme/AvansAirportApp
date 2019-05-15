let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to invoices',
    });
});

var contactController = require('../controllers/invoiceController');

router.route('/invoices')
    .get(contactController.index)
    .post(contactController.new);

router.route('/invoices/:invoice_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
 
    module.exports = router;