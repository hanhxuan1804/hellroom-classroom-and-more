const router = require('express').Router();
const passport = require('../passport');

router.use('/', passport.authenticate('jwt', {session: false}), require('./presentationController'));

module.exports = router;