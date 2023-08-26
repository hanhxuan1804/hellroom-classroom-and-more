const router = require('express').Router();
const presentationSevice = require('./presentationService');

router.post('/create-presentation', presentationSevice.createPresentation);
router.get('/get-presentation/:presentationId', presentationSevice.getPresentation);
router.put('/update-presentation-slides', presentationSevice.updatePresentationSlides);


// router.get('/get-presentation/:presentationId', presentationSevice.getPresentation);
// router.get('/get-presentations', presentationSevice.getPresentations);
// router.put('/update-presentation', presentationSevice.updatePresentation);
// router.delete('/delete-presentation', presentationSevice.deletePresentation);

module.exports = router;

