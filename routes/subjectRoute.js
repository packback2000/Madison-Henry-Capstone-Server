const router = require('express').Router();
const subjectController = require('../controllers/subjectController');

router.route('/').get(subjectController.index);

router.route('/:subject_id').get(subjectController.singleSubject);

router.route('/').post(subjectController.addSubject);

router
    .route('/:subject_id/posts')
    .get(subjectController.subjectInventory)
    .post(subjectController.subjectInventory);

module.exports = router;