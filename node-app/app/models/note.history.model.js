const mongoose = require('mongoose');

const NoteHistorySchema = mongoose.Schema({
    key: String,
    value: String,
    timestamp: Number
});

module.exports = mongoose.model('tblnotehistorys', NoteHistorySchema);
