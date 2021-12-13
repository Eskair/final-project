const express = require('express');
const app = express();
const port = 8000;

//firebase db
const { db, Timestamp } = require('./firebaseConfig');

//body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//get a school doc
app.get('/api/schools/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    //get a school doc ref with an id
    const docRef = db.collection('schools').doc(uid);
    const data = (await docRef.get()).data();
    //retrieve a school doc data
    res.status(200).json({ status: 200, data });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, ...err });
  }
});

//create a new school doc
app.post('/api/schools', async (req, res) => {
  const { uid } = req.body;
  try {
    //create a new school doc with an id of uid from auth
    const docRef = db.collection('schools').doc(uid);

    //initially a new doc has only two meaningful props, uid and admin(email)
    //the rest can be updated later on a setting page
    await docRef.set({
      ...req.body,
      name: '',
      location: '',
      code: '',
    });

    res.status(200).json({ status: 200, message: 'Admin created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
});

//get a classroom doc
app.get('/api/classrooms/:uid/:client', async (req, res) => {
  const { uid, client } = req.params;
  try {
    //get a classroom doc with a provided email
    const snapshot = await db
      .collection('schools')
      .doc(uid)
      .collection('classrooms')
      .where('client', '==', client)
      .get();
    if (snapshot.empty) {
      res.status(404).json({ status: 404, message: 'Client not found' });
      return;
    }

    snapshot.forEach((doc) => {
      //retrieve a classroom doc data
      res
        .status(200)
        .json({ status: 200, data: { ...doc.data(), id: doc.id } });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, ...err });
  }
});

//create a new classroom doc
app.post('/api/classrooms', async (req, res) => {
  const { uid, client } = req.body;
  try {
    //create a new classroom doc with an auto-generated id
    const docRef = db
      .collection('schools')
      .doc(uid)
      .collection('classrooms')
      .doc();

    //initially a new doc has only one meaningful prop, client(email)
    //in order to get an access to the classroom
    //the rest can be updated later on a settings page
    await docRef.set({
      client,
      name: '',
    });

    res.status(200).json({ status: 200, message: 'Client created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
});

//get all sprint docs under a client
app.get('/api/sprints/:uid/:clientId', async (req, res) => {
  const { uid, clientId } = req.params;
  try {
    //get a classroom doc with a provided email
    const sprintRef = await db
      .collection('schools')
      .doc(uid)
      .collection('classrooms')
      .doc(clientId)
      .collection('sprints')
      .get();

    //retrieve all sprint docs data
    const data = sprintRef.docs.map((sprint) => {
      return { ...sprint.data(), id: sprint.id };
    });

    res.status(200).json({ status: 200, data });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, ...err });
  }
});

//get a sprint doc under a client
app.get('/api/sprints/:uid/:clientId/:sprintId', async (req, res) => {
  const { uid, clientId, sprintId } = req.params;
  try {
    //get a classroom doc with a provided email
    const sprintRef = await db
      .collection('schools')
      .doc(uid)
      .collection('classrooms')
      .doc(clientId)
      .collection('sprints')
      .doc(sprintId)
      .get();

    //retrieve a sprint doc data
    const data = sprintRef.data();

    res.status(200).json({ status: 200, data });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, ...err });
  }
});

//create a new sprint doc
app.post('/api/sprints', async (req, res) => {
  const { uid, clientId } = req.body;
  try {
    //create a new classroom doc with an auto-generated id
    const docRef = db
      .collection('schools')
      .doc(uid)
      .collection('classrooms')
      .doc(clientId)
      .collection('sprints')
      .doc();

    //initially all props are populated with empty strings on creation
    //except for startDate, which is set to current date(can be modified)
    //props can be updated later on a settings page
    await docRef.set({
      title: 'New Sprint',
      options: [],
      start: Timestamp.now(),
      end: '',
    });

    res.status(200).json({ status: 200, message: 'Sprint created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
});

app.get('*', (req, res) => {
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running at port 8000`);
});