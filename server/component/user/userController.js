const router = require('express').Router();
const user = require('./userService');
const passport = require('../passport');
const { upload } = require('../../mongooseModel/User');

router.put('/update', passport.authenticate('jwt', { session: false }), user.updateProfile);
router.post('/upload-avatar', passport.authenticate('jwt', { session: false }), upload , user.uploadAvatar);
router.get('/avatar/:id', user.getAvatar);

module.exports = router;