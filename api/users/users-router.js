const express = require('express');
const router = express.Router();

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem getting users',
      });
});
  // RETURN AN ARRAY WITH ALL THE USERS

});

router.get('/:id', validateUserId, (req, res) => {
// RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem adding user',
      });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, { name: req.name})
    .then(() => {
      return Users.getById(req.params.id);
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem updating user',
      });
    });

});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem removing user',
      });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem getting posts',
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(err => {
      res.status(500).json({
        message: 'problem adding post',
      });
    });
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside users router happened',
    message: err.message,
  });
});

// do not forget to export the router
module.exports = router;
