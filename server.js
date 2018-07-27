// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const port = 5000;

const projectDb = require("./data/helpers/projectModel.js");
const actionDb = require("./data/helpers/actionModel.js");

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
    }
    if (name > 120) {
    	res.status(400).json({error: "Name exceeds character limit"});
    }else {
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
                        res.status(500).json({ error: "Unable to locate list of projects" })
                    })
            } else {
                res.status(404).json({ error: `Not able to retrieve this project ${id}` })
            }
        })
        .catch ( error => {
            res.status(500).json({ error: `Error- Not able to delete project ${id}` })
        })
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const { name, description, completed } = req.body
    if (!name || !description) {
        res.status(400).json({ error: "Add a name and description to this project" })
    } else {
        projectDb.update(id, { name, description, completed })
            .then( project => {
                projectDb ? res.status(201).json(project) : res.status(500).json({ error: `Unable to update project with id ${id}` })
            })
            .catch( error => {
                res.status(500).json({ error: `Error - Not able to update this project. ${id}` })
            })
    }
})


//Retrieve list of actions for a project
server.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params
    projectDb.getProjectActions(id)
        .then(projectActions => {
            res.status(200).json(projectActions)
        })
        .catch( error => {
            res.status(500).json({ error: `Not able to retrieve list of actions for this project ${id}` })
        })
})



//**********ACTIONS ENDPOINTS***************
server.get('/api/actions', (req, res) => {
	actionDb.get()
		.then(actions => {
			res.status(200).json({actions});
		})
		.catch(err => {
			res.status(500).json({error: "Unable to get list of actions."});
		});
});

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.get(id)
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch( error => {
            res.status(404).json({ error: `Not able to retrieve this action ${id}` })
        })
})

server.post('/api/actions', (req, res) => {
    const { description, project_id,  notes, completed } = req.body;
    const info = { description, project_id,  notes, completed }
    if(!project_id || !description){
        res.status(400).json({ error: 'Add project_id and description.' })
    }
    actionDb.insert(info)
        .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        res.status(500).json({ error: 'Error in creating action.' })
    })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                actionDb.get()
                    .then( actions => {
                        res.status(200).json(actions)
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Not able to retrieve list actions" })
                    })
            } else {
                res.status(404).json({ error: `Not able to delete this action ${id}` })
            }
        })
        .catch ( error => {
            res.status(500).json({ error: `Not able to delete this action ${id}` })
        })
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const { project_id, description, notes, compoleted } = req.body
    if (!project_id || !description) {
        res.status(400).json({ error: "Add a project id and description to this project" })
    } else {
        actionDb.update(id, { project_id, description })
            .then( action => {
                actionDb ? res.status(201).json(action) : res.status(500).json({ error: `Unable to update project with id ${id}` })
            })
            .catch( error => {
                res.status(500).json({ error: `Error - Not able to update this project. ${id}` })
            })
    }
})

//server is listening
server.listen(5000, () => console.log('API is running'));
