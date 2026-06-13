const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String },
        shippingAddress: {
            type: [
                {
                    streetAddress: { type: String, required: true },
                    city: { type: String, required: true },
                    state: { type: String, required: true },
                    postal: { type: String, required: true },
                }
            ]
        },
        allowOthersToSeeOrders: Boolean,
        role: String,
        joinedAt: String,
    },
    { versionKey: false }
);

const Users = mongoose.model('user', usersSchema);

module.exports = Users;