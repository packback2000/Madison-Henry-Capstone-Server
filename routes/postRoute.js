const router = require('express').Router();
const postController = require('../controllers/postController');

router
    .route('/')
    .get(postController.index)
    .post(postController.addPost);

router
    .route('/:id')
    .get(postController.singlePost)
    .put(postController.updatePost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router  
    .route('/:id/comments')
    .get(postController.comment);



module.exports = router;