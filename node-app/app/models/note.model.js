const mongoose = require('mongoose');

const NoteMasterSchema = mongoose.Schema({
    key: String,
    value: String,
    timestamp: Number
});

module.exports = mongoose.model('tblnotemasters', NoteMasterSchema);
