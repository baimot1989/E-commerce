const usersRepo = require('../repositories/usersRepo')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getDate, createToken } = require('../utils/utils');


const getAllUsers = () => {
   return usersRepo.getUsers();
}

const getUserById = (id) => {
   return usersRepo.getUserById(id);
};
const addUser = async (newUser) => {
   const existingUsers = await usersRepo.getUsers();
   const usernames = existingUsers.map(user => user.userName);

   const userExists = usernames.includes(newUser.userName);
   if (userExists) {
      throw new Error('Username is already in use');
   }

   // // 🔐 Password validation
   // const password = newUser.password;
   // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

   // if (!passwordRegex.test(password)) {
   //    throw new Error(
   //       'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
   //    );
   // }

   // // 🔒 Hash the password
   // const SALT_ROUNDS = 10;
   // const salt = await bcrypt.genSalt(SALT_ROUNDS)
   // const hashedPassword = await bcrypt.hash(password, salt);
   // newUser.password = hashedPassword;

   // Add user metadata
   newUser.role = 'customer';
   newUser.joinedAt = getDate();

   const result = await usersRepo.addUser(newUser);
   return result;
};

const updateUser  = async (id, obj) => {
   if(!obj.password){
      throw new Error('Must fill in a password ');
   }
   return usersRepo.updateUser(id, obj);
};

const deleteUser = (id) => {
   return usersRepo.deleteUser(id);
};

const loginUser = async (userName, password) => { // temp' צריך לעשות ולידציה

   if (typeof userName !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid input: username and password must be strings');
   }

   if (!userName.trim() || !password.trim()) {
      throw new Error('Username and password are required');
   }

   const user = await usersRepo.getUserByUserName(userName)

   if (!user) {
      throw new Error('User not found');
   }

   // const isMatch = await bcrypt.compare(password, user.password);
   
   // if (!isMatch) {
   //    console.log(isMatch)
   //    // handle invalid login
   //    console.log('user name/password is incorrect')
   //    throw new Error('user name/password is incorrect')
   // }
   if (user.password !== password) {
      console.log('user name/password is incorrect')
      throw new Error('user name/password is incorrect')

   }
   console.log(user)
   const token = createToken(user._id);
   return {
      user,
      token
   }
}

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser, loginUser };