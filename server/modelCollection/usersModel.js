const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        firstName: {type: String, require: true},
        lastName: {type: String, require: true},
        userName: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        allowOthersToSeeOrders: Boolean,
        role: String,
        joinedAt: String,
    },
    { versionKey: false }
);

const Users = mongoose.model('user', usersSchema);

module.exports = Users;