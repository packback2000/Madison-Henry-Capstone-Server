const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('subjects')
    .select('title', 'num_posts', 'subject_id')
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res.status(400).send(`Error retrieving subjects: ${err}`))
};

exports.singleSubject = (req, res) => {
    knex('subjects')
    .where({subject_id: req.params.subject_id})
    .then((data) => {
        if(!data.length) {
            return res.status(400).send(`Record with id: ${req.params.id} is not found`);
        }
        res.status(200).json(data[0]);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving subject $req.params.id ${err}`)
    );
};

exports.addSubject = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send('Please make sure to provide title');
      }

    knex('subjects')
    .insert(req.body)
    .then((data) => {
        const newSubjectURL = `/subjects/${data[0]}`;
        res.status(201).location(newSubjectURL).send(newSubjectURL)
    })
    .catch((err) => res.status(400).send(`Error creating subject: ${err}`));
};

exports.subjectInventory = (req,res) => {
    knex('posts')
    .where({subject_id: req.params.subject_id})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
    res
    .status(400)
    .send(`Error retrieving posts for subject ${req.params.subject_id} ${err}`)
    );
};

exports.addSubjectPost = (req,res) => {
    knex('posts')
    .insert(req.body && req.title)
    .then((data) => {
        const newPostURL = `subjects/${req.params.subject_id}/${data[0]}`
        res.status(201).location(newPostURL).send(newPostURL);
    })
    .catch((err) => res.status(400).send(`Error creating post: ${err}`));
};