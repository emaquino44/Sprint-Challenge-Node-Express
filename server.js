// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const server = express();
const port = 5000;

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));


//Route handler -test
server.get('/', (req, res) => {

  res.send('Hello World');
});



//server is listening
server.listen(5000, () => console.log('API is running'));
