import express from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/Users.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { UserName, UserEmail, UserPassword } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ UserEmail });
  if (existingUser) {
    return res.status(400).send("User already exists!");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(UserPassword, 10);

  // Create a new user
  const newUser = new User({ UserName, UserEmail, UserPassword: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send("User Registered Successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { UserEmail, UserPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ UserEmail });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    // If everything is correct, respond with a success message
    res.status(200).send("User Logged In");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
