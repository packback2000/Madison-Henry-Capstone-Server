const router = require('express').Router();
const commentController = require('../controllers/commentController');

router
    .route('/')
    .get(commentController.index)
    .post(commentController.addComment);

router
    .route('/:comment_id')
    .get(commentController.singleComment)
    .patch(commentController.updateComment)
    .post(commentController.addComment)
    .delete(commentController.deleteComment);

module.exports = router;