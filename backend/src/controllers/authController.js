import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email, password);

  const user = await User.findOne({ email });
  console.log("USER FOUND:", user);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await user.matchPassword(password);
  console.log("PASSWORD MATCH:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};
