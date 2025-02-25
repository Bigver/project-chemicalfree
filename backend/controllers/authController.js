import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Personal from "../models/personalModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { password, username } = req.body;

    if (!password || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

      const existingUsername = await User.findOne({
        where: { username },
      });

      if (existingUsername) {
        return res.status(400).json({ error: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว กรุณาใช้ชื่ออื่น" });
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    await Personal.create({
      userId: newUser.id, // เชื่อมกับ user
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid username or password" });
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
