const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Invalid Token:", error.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };