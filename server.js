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

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params
    projectDb.get(id)
        .then( project => {
            res.status(200).json(project)
        })
        .catch( error => {
            res.status(404).json({ error: `Unable to locate this project ${id}` })
        })
});

server.post('/api/projects', (req, res) => {
    const { name, description, completed } = req.body
    if (!name || !description) {
        res.status(400).json({ error: "Please add name and description of your project." })
    } else {
        projectDb.insert({ name, description, completed })
            .then( project => {
                res.status(201).json(project)
            })
            .catch( error => {
                res.status(500).json({ error: "Error in creating project" });
            })
    }
});

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params
    projectDb.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                projectDb.get()
                    .then( projects => {
                        res.status(200).json(projects)
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Unable to locate projects" })
                    })
            } else {
                res.status(404).json({ error: `Not able to retrieve this project ${id}` })
            }
        })
        .catch ( error => {
            res.status(500).json({ error: `Error- Not able to delete project ${id}` })
        })
})





//server is listening
server.listen(5000, () => console.log('API is running'));
