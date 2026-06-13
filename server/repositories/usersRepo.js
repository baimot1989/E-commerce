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
    console.log(obj)
    return Users.findByIdAndUpdate(id, obj);
}; 
const updateUserByPatch = async (id, obj) => {
  return await Users.findByIdAndUpdate(
    id,
    { $set: obj },
    { new: true }
  );
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
    getUserByUserName,
    updateUserByPatch
}

