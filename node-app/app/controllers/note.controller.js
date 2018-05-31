const NoteMaster = require('../models/note.model.js');
const NoteHistory = require('../models/note.history.model.js');
const moment = require('moment-timezone');

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if(!req.body.value) {
    return res.status(400).send({
      message: "Note value can not be empty"
    });
  }

    const tstamp = req.body.timestamp == "" ? moment().valueOf() : req.body.timestamp;
  // Create a Note
  const note = new NoteMaster({
    key: req.body.key,
    value: req.body.value,
    timestamp: tstamp
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


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  NoteHistory.find()
  .then(notes => {
    res.send(notes);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
    });
  });
};

exports.findByKey = (req, res) => {

  const keyToFind = req.params.stamp == undefined ? {key: req.params.myKey}: {key: req.params.myKey, timestamp : { $lt:req.params.stamp }};
  NoteMaster.find(keyToFind,
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
      if(note.length >0){
        res.send(note);
      }else{
        NoteHistory.find(keyToFind,
          {
            "value": 1,
            _id: 0
          }).sort({timestamp:-1}).limit(1)
          .then(note => {
            res.send(note);
          })
        }
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

      // First, find key value
      NoteMaster.find({key: req.params.myKey}).limit(1)
      .then ( note => {
        if(note.length > 0){

          note.map((item) => {

            // Create a Note
            const noteHistory = new NoteHistory({
              key: item.key,
              value: item.value,
              timestamp: item.timestamp
              //moment(1369266934311).tz("Asia/Singapore").format('h:mm A')
            });
            // Save Note in the database
            noteHistory.save();
          })


          // Find note and update it with the request body
          const tstamp = req.body.timestamp == "" ? moment().valueOf() : req.body.timestamp;
          NoteMaster.findOneAndUpdate({key: req.params.myKey}, { $set: {
            key: req.body.key,
            value: req.body.value,
            timestamp: tstamp
          }}, {new: true})
          .then(note2 => {
            if(!note2) {
              return res.status(404).send({
                message: "Note not found with id " + req.params.myKey
              });
            }
            // updated
            res.send(note2);
          })
        } else {
          return res.status(404).send({
            message: "Note not found with id " + req.params.myKey
          });
        }

      })
    };
