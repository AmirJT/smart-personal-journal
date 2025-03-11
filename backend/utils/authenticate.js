const { verifyToken } = require("../utils/auth");

const authenticateUser = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
};

module.exports = { authenticateUser };