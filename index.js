// require your server and launch it

// Path: api/users/users-router.js
const server = require('./api/server.js');

const port = 5000;

server.listen(port, () => {
  console.log(`listening on ${port}`)
})  
