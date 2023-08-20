const router = require('express').Router();
const group = require('./groupService');

router.get('/', group.getAllOfUser);
router.post('/create', group.create);
router.get('/:id', group.getOne);
router.post('/join', group.join);
router.get('/:id/members', group.getMembers);
router.put('/update', group.update);
router.delete('/delete/:id', group.delete);

module.exports = router;