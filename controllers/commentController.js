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
