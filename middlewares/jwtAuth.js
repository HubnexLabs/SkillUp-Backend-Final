import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const secretKey = process.env.JWT_SECRET_KEY; // Replace with your actual secret key
const secretKey = process.env.JWT_SECRET_KEY;
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ error: "Login to access admin panel" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized!" });
    }
    // req.userId = decoded.id;
    next();
  });
};

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, password: user.password }, secretKey, {
    expiresIn: "1h", // 24 hours
  });
};

export { verifyToken, generateToken };
