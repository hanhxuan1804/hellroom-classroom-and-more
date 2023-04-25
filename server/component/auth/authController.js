const router = require('express').Router();
const auth = require('./authService');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/google-login', auth.googleLogin);
router.post('/verify-email', auth.verify);

module.exports = router;