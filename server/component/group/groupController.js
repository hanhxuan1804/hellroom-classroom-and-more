const router = require('express').Router();
const group = require('./groupService');

router.get('/', group.getAllOfUser);
router.post('/create', group.create);
router.get('/:id', group.getOne);
// router.post('/', group.create);
// router.put('/:id', group.update);
// router.delete('/:id', group._delete);

module.exports = router;