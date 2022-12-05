const router = require('express').Router();

router.use('/', require('./authController'));

module.exports = router;