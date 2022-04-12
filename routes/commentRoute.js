const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.route('/').get(commentController.index);
router.route('/').post(commentController.addComment)

module.exports = router;