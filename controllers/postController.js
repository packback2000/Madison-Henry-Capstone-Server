const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('posts')
    .then((data) => {
        res.status(200).json(data);
    })
    
    .catch((err) => 
    res.status(400).send(`Error retrieving posts: ${err}`))
}

exports.singlePost = (req, res) => {
    knex('posts')
    .where({post_id: req.params.post_id})
    .then((data) => {
        if(!data.length) {
            return res.status(400).send(`Record with id: ${req.params.post_id} is not found`);
        }
        res.status(200).json(data[0]);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving posts $req.params.id ${err}`)
    );
};

exports.addPost = (req, res) => {
    if (!req.body.title || !req.body.body) {
        return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
      }

    knex('posts')
    .insert(req.body)
    .then((data) => {
        const newPostURL = `/posts/${data[0]}`;
        res.status(201).location(newPostURL).send(newPostURL);
    })
    .catch((err) => res.status(400).send(`Error creating post: ${err}`));
};

exports.postInventories = (req,res) => {
    knex('comments')
    .where({post_id: req.params.post_id})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res
    .status(400)
    .send(
        `Error retrieving comments for post ${req.params.post_id} ${err}`
    )
    );
};

exports.updatePost = (req, res) => {
    knex('posts')
    .update(req.body)
    .where({id: req.params.post_id})
    .then(() => {
        res.statud(200).send(`Post with id ${req.params.post_id} has been updated`);
    })
    .catch((err) =>
        res.status(400).send(`Error updating post ${req.params.id} ${err}`)
    );
}

exports.deletePost = (req,res) => {
    knex('posts')
    .delete()
    .where({post_id: req.params.post_id})
    .then(() => {
        res.status(204).send(`post with id ${req.params.post_id} has been deleted`);
    })
    .catch((err) => 
        res.status(400).send(`Error deleting post ${req.params.post_id} ${err}`)
    );
};

