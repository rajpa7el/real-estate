const User = require('../models/user.model.js')
const bycryptjs = require('bcryptjs');

const signup = async (req, res) => {
   const { username, email, password } = req.body;
   const hashedPassword = bycryptjs.hashSync(password, 10);
   const newUser = new User({username, email, password: hashedPassword});

   try{
      await newUser.save();
      res.status(201).json("New user created");
   } catch (error){
      res.status(500).json(error.message);
   }
}

module.exports = { signup };