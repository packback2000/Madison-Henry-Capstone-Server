const router = require('express').Router();
const postController = require('../controllers/postController');

router
    .route('/')
    .get(postController.index)
    .post(postController.addPost);

router
    .route('/:post_id')
    .get(postController.singlePost)
    .put(postController.updatePost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router  
    .route('/:post_id/comments')
    .get(postController.postInventories);



module.exports = router;