const router = require('express').Router();

router.use('/', require('./userController'));

module.exports = router;