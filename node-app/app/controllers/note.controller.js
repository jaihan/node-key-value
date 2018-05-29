const Note = require('../models/note.model.js');
const moment = require('moment-timezone');


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.value) {
        return res.status(400).send({
            message: "Note value can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        value: req.body.value,
        timestamp: moment().valueOf()
        //moment(1369266934311).tz("Asia/Singapore").format('h:mm A')
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Find a single note with a myKey
exports.findByKey = (req, res) => {
    Note.find({_id: req.params.myKey},
    {
      "value": 1,
      _id: 0
    }).limit(1)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.myKey
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.myKey
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.myKey
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.value) {
        return res.status(400).send({
            message: "Note value can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.myKey, {
        value: req.body.value,
        timestamp: moment().valueOf()
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.myKey
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.myKey
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.myKey
        });
    });
};
