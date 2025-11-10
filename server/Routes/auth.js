// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/Users.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

/* ===========================
   REGISTER
=========================== */
router.post("/register", async (req, res) => {
  try {
    const { UserName, UserEmail, UserPassword } = req.body;

    if (!UserName || !UserEmail || !UserPassword)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ UserEmail: UserEmail.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(UserPassword, 12);
    const newUser = new User({
      UserName,
      UserEmail: UserEmail.toLowerCase(),
      UserPassword: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;

    if (!UserEmail || !UserPassword)
      return res.status(400).json({ error: "All fields are required" });

    const user = await User.findOne({ UserEmail: UserEmail.toLowerCase() });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.UserEmail },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  Set token as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //  Also send it in response body (for frontend dev convenience)
    res.status(200).json({
      message: "Login successful",
      token, // <-- added this line
      user: {
        id: user._id,
        name: user.UserName,
        email: user.UserEmail,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

/* ===========================
   GET CURRENT USER
=========================== */
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-UserPassword");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user._id,
      name: user.UserName,
      email: user.UserEmail,
      profilePic: user.profilePic || "/img/profile.jpg",
    });
  } catch (err) {
    console.error("Get me error:", err);
    res.status(401).json({ error: "Token is not valid" });
  }
});

/* ===========================
   LOGOUT
=========================== */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
