// createUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Make sure your User model exists

mongoose.connect("mongodb://localhost:27017/product_library")
  .then(async () => {
    console.log("DB connected!");

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword
    });

    await user.save();
    console.log("Test user created!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));