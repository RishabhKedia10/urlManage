const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const currUser = getUser(userUid);

  if (!currUser) return res.redirect("/login");

  req.user = currUser;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const thisUser = getUser(userUid);
  req.user = thisUser;
  next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
