// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const port = 5000;

const projectDb = require("./data/helpers/projectModel.js");


//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));


//Route handler -test
server.get('/', (req, res) => {

  res.send('Hello World');
});

//**********PROJECT ENDPOINTS***************
server.get('/api/projects', (req, res) => {
	projectDb.get()
		.then(projects => {
			res.status(200).json({projects});
		})
		.catch(err => {
			res.status(500).json({error: "Unable to get list of project."});
		});
});




//server is listening
server.listen(5000, () => console.log('API is running'));
