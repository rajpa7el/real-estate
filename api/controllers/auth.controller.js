const User = require('../models/user.model.js');
const bycryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bycryptjs.hashSync(password, 10);
   const newUser = new User({username, email, password: hashedPassword});

   try{
      await newUser.save({ bufferTimeoutMS: 60000 });
      res.status(201).json("New user created");
   } catch (error){
      next(error);
   }
}

const signin = async (req, res, next) => {
   const { username, password } = req.body;
   const hashedPassword = bycryptjs.hashSync(password, 10);
   try {
     const validUser = await User.findOne({ username });
     if (!validUser) return next(errorHandler(404, 'User not Found'));
     const validPassword = bycryptjs.compareSync(password, validUser.password);
     if(!validPassword) return next(errorHandler(404, 'Wrong Credentials'));
     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
     const { password: pass, ...userInfo} = validUser._doc;
     res.cookie('token', token, {httpOnly: true}).status(200).json(userInfo);
   } catch (error) {
      next(error);
   }
};

module.exports = { signup, signin };

