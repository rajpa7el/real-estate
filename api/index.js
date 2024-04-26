const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRouter = require('./routes/user.route.js');

dotenv.config();

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

const app = express();

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});

app.use('/api/user', userRouter);
