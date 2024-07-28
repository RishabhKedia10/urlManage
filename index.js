const { connectToMongoDB } = require("./connect");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb Connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
