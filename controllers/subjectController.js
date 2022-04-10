const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
    knex('subjects')
    .select('title', 'num_posts', 'subject_id')
    .then((data) => {
        res.status(200).json(data);
    })
    
    .catch((err) => 
    res.status(400).send(`Error retrieving subjects: ${err}`))
}

exports.singleSubject = (req, res) => {
    knex('subjects')
    .where({id: req.params.id})
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
    if (!req.body.title || !req.body.num_posts) {
        return res.status(400).send('Please make sure to provide title and number of posts');
      }

    knex('subjects')
    .insert(req.body)
    .then((data) => {
        const newSubjectURL = `/subjects/${data[0]}`;
        res.status(201).location(newSubjectURL).send(newSubjectURL)
    })
    .catch((err) => res.status(400).send(`Error creating subject: ${err}`));
}