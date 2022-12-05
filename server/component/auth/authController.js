const router = require('express').Router();
const auth = require('./authService');
const passport = require('./passport');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), auth.profile);

module.exports = router;