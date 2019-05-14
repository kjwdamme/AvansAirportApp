let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
       id: '01',
       description: 'Test object',
    });
});

module.exports = router;