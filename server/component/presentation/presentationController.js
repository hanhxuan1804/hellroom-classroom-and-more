const router = require('express').Router();
const presentationSevice = require('./presentationService');


router.get('/get-presentation/:presentationId', presentationSevice.getPresentation);
router.get('/get-presentations', presentationSevice.getPresentations);
router.post('/create-presentation', presentationSevice.createPresentation);
router.put('/update-presentation', presentationSevice.updatePresentation);
router.delete('/delete-presentation', presentationSevice.deletePresentation);

module.exports = router;

