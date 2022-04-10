const router = require('express').Router();
const subjectController = require('../controllers/subjectController');

router.route('/').get(subjectController.index);

router.route('/:id').get(subjectController.singleSubject);

router.route('/').post(subjectController.addSubject);

module.exports = router;