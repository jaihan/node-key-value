module.exports = (app) => {
  const notes = require ('../controllers/note.controller.js');


  // Create a new Note
    app.post('/object', notes.create);

    // Retrieve a single Note with myKey
    app.get('/object/:myKey', notes.findByKey);

    // Update a Note with myKey
    app.put('/object/:myKey', notes.update);

}
