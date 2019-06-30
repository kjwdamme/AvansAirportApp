let router = require('express').Router();
var queryController = require('../controllers/queryController');

router.get('/', function (req, res) {
    res.json({
        id: '01',
        description: 'Test object',
    });
});

router.route('/checkins')
    .get(queryController.index);
router.route('/checkins/:checkin_id')
    .get(queryController.view);

module.exports = router;

