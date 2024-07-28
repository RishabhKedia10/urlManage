const jwt = require("jsonwebtoken");
const secret = "Rishabh$123#@";

function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Error is in service auth, ERROR: ", error);
  }
}

module.exports = {
  setUser,
  getUser,
};
