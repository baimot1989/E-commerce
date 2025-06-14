const Users = require('../modelCollection/usersModel');

const getUsers = () => {
    return Users.find();
}

const getUserById = (id) => {
    return Users.findById(id);
};
const getUserByUserName = (userName) => {
    return Users.findOne({userName});
};
const addUser = (obj) => {
    const user = new Users(obj);
    return user.save();
};
const updateUser = (id, obj) => {
    return Users.findByIdAndUpdate(id, obj);
}; 
const deleteUser = (id) => {
    return Users.findByIdAndDelete(id);
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserByUserName
}

