const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('comments')
    
    .then((data) => {
        res.status(200).json(data);
    })
    
    .catch((err) => 
    res.status(400).send(`Error retrieving comments: ${err}`))
}

exports.singleComment = (req, res) => {
    knex('comments')
    .where({id: req.params.id})
    .then((data) => {
        if(!data.length) {
            return res.status(400).send(`Record with id: ${req.params.id} is not found`);
        }
        res.status(200).json(data[0]);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving comment $req.params.id ${err}`)
    );
};

exports.addComment = (req, res) => {
    if (!req.body.body) {
        return res.status(400).send('Please make sure to provide the body of the comment');
      }

    knex('comments')
    .insert(req.body)
    .then((data) => {
        const newCommentURL = `/comments/${data[0]}`;
        res.status(201).location(newCommentURL).send(newCommentURL)
    })
    .catch((err) => res.status(400).send(`Error creating comment: ${err}`));
}