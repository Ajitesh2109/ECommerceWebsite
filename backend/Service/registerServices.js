import sql from "mssql";
import bcrypt from "bcryptjs";
import {pool} from "../db.js";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const request = pool.request();
    await request
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password_hash", sql.NVarChar, hash)
      .query(`
        INSERT INTO users (name, email, password_hash)
        VALUES (@name, @email, @password_hash)
      `);

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

export default createUser;

