const router = require('express').Router();
const group = require('./groupService');

router.get('/', group.getAll);
// router.get('/:id', group.getById);
// router.post('/', group.create);
// router.put('/:id', group.update);
// router.delete('/:id', group._delete);

module.exports = router;