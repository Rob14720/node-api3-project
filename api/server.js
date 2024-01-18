const express = require('express');

const server = express();

server.use(express.json());

const { logger } = require('./middleware/middleware.js');

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(logger);


// this needs to be wired up as well, after the middleware but before the server.listen call



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
