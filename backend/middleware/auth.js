import pkg from "jsonwebtoken";
import config from 'dotenv';
config.config();
const JWT_SECRET = process.env.JWT_SECRET;
const verify = pkg.verify

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
}

export default verifyToken;