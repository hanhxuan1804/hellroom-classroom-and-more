const router = require('express').Router();

router.use('/', require('./groupController'));

module.exports = router;