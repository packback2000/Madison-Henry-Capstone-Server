const commentData = require ('../seed_data/comments');
const postData = require('../seed_data/posts');
const subjectData = require('../seed_data/subjects');

exports.seed = function(knex) {
  return knex('subjects')
  .del()
  .then(function () {
    return knex('subjects').insert(subjectData);
  })
  .then(() => {
    return knex('posts').del();
  })
  .then(() => {
    return knex('posts').insert(postData);
  })
  .then(()=> {
    return knex('comments').del();
  })
  .then(() => {
    return knex('comments').insert(commentData);
  });
};