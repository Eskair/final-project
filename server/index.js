const express = require('express');
const app = express();
const port = 8000;

//firebase db
const { db, Timestamp, FieldValue } = require('./firebaseConfig');

//body parser middleware
app.use(express.json());

//handlers
const {
  getSchool,
  createSchool,
  updateSchool,
  getClassroom,
  createClassroom,
  getSprints,
  getSprint,
  createSprint,
  updateSprint,
  deleteSprint,
  createProjection,
  updateProjection,
  getProjections,
  getProjection,
} = require('./handlers');

//get a school doc
app.get('/api/admins/:uid', getSchool);

//create a new school doc
app.post('/api/admins', createSchool);

//update a school doc
app.patch('/api/admins/:uid', updateSchool);

//get a classroom doc
app.get('/api/admins/:uid/clients/:client', getClassroom);

//create a new classroom doc
app.post('/api/clients', createClassroom);

//get a sprint doc under a client
app.get('/api/admins/:uid/clients/:clientId/sprints/:sprintId', getSprint);

//get all sprint docs under a client
app.get('/api/admins/:uid/clients/:clientId/sprints', getSprints);

//create a new sprint doc
app.post('/api/sprints', createSprint);

//update a sprint doc under a client
app.patch('/api/admins/:uid/clients/:clientId/sprints/:sprintId', updateSprint);

//delete a sprint doc under a client
app.delete(
  '/api/admins/:uid/clients/:clientId/sprints/:sprintId',
  deleteSprint
);

//get a projection doc under a sprint
app.get(
  '/api/admins/:uid/clients/:clientId/sprints/:sprintId/projections/:projectionId',
  getProjection
);

//get all projection docs under a sprint
app.get(
  '/api/admins/:uid/clients/:clientId/sprints/:sprintId/projections',
  getProjections
);

//create a new projection doc
app.post('/api/projections', createProjection);

//update a projection doc under a sprint
app.patch(
  '/api/admins/:uid/clients/:clientId/sprints/:sprintId/projections/:projectionId',
  updateProjection
);

app.get('*', (req, res) => {
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running at port 8000`);
});
