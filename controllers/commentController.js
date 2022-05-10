const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('comments')
    .then((data) => {
        res.status(200).json(data);
    })
    
    .catch((err) => 
    res.status(400).send(`Error retrieving comments: ${err}`))
};

exports.addComment = (req, res) => {
    if (!req.body.body) {
        return res.status(400).send('Please make sure to provide content');
      }

    knex('comments')
    .insert(req.body)
    .then((data) => {
        const newCommentURL = `/comments/${data[0]}`;
        res.status(201).location(newCommentURL).send(newCommentURL);
    })
    .catch((err) => res.status(400).send(`Error creating post: ${err}`));
};

exports.singleComment = (req,res) => {
    knex('comments')
    .where({comment_id:req.params.comment_id})
    .then((data) => {
        if (!data.length) {
            return res.status(400).send(`Record with id: ${req.params.comment_id} is not found`);
        }
        res.status(200).json(data[0]);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving posts ${req.params.comment_id} ${err}`)
    );
};

exports.updateComment = (req, res) => {
    knex('posts')
    .update(req.body)
    .where({comment_id: req.params.comment_id})
    .then(() => {
        res.status(200).send(`Post with id ${req.params.post_id} has been updated`);
    })
    .catch((err) =>
        res.status(400).send(`Error updating post ${req.params.id} ${err}`)
    );
};

exports.deleteComment = (req,res) => {
    knex('comments')
    .delete()
    .where({comment_id: req.params.comment_id})
    .then(() => {
        res.status(204).send('comment has been deleted');
    })
    .catch((err) => 
        res.status(400).send('Error deleting comment')
    );
};