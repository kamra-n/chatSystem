const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // you have a User model
        required: true
    }],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
