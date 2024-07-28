const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email, password });

  if (!foundUser) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const token = setUser(foundUser);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
