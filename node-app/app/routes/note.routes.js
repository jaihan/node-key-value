module.exports = (app) => {
  const notes = require ('../controllers/note.controller.js');


    // Create a new Note
    app.post('/object', notes.create);

    // Retrieve a single Note with myKey & timestamp
    app.get('/object/:myKey/timestamp/:stamp', notes.findByKey);

    app.get('/object/:myKey', notes.findByKey);
    // Update a Note with myKey
    app.put('/object/:myKey', notes.update);

    app.get('/object', notes.findAll);

}
