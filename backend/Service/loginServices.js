import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {pool} from "../db.js";
import config from 'dotenv';
config.config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const request = pool.request();
    const result = await request
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

export default loginUser;