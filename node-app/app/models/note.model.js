const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    value: String,
    timestamp: Number
});

module.exports = mongoose.model('Note', NoteSchema);
