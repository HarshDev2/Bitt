const mongoose = require('mongoose');
const Verification = new mongoose.Schema({
    ServerID: { type: String, unique: true, required: true},
    ChannelID: { type: String, unique: true, required: true},
    RoleID: { type: String, unique: true, required: true},
})

module.exports = { Verification: mongoose.model("Verification", Verification) }