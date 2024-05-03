const User = require('../models/user.model.js')
const bycryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');

const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bycryptjs.hashSync(password, 10);
   const newUser = new User({username, email, password: hashedPassword});

   try{
      await newUser.save();
      res.status(201).json("New user created");
   } catch (error){
      next(error);
   }
}

module.exports = { signup };