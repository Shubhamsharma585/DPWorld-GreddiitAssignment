const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const initializeDBConnection = require("./db/db.connect");
const authVerify = require("./middlewares/authVerify");
const User = require("./models/User");

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

initializeDBConnection();

app.use("/", require("./routes/auth.routes"));
app.use("/posts", authVerify, require("./routes/post.routes"))
app.use("/greddits", authVerify, require("./routes/greddit.routes"))
app.use("/reports", authVerify, require("./routes/reports.routes"))
app.use("/posts/:postId/likes", (req, res, next) => { req.postId = req.params.postId; next() }, authVerify, require("./routes/like.routes"))
app.use("/posts/:postId/dislikes", (req, res, next) => { req.postId = req.params.postId; next() }, authVerify, require("./routes/dislike.routes"))
app.use("/posts/:postId/comments", (req, res, next) => { req.postId = req.params.postId; next() }, authVerify, require("./routes/comment.routes"))
app.use("/home", authVerify, require("./routes/home.routes"))
app.use("/users", authVerify, require("./routes/user.routes"))
app.use("/user-connections", authVerify, require("./routes/user-connection.routes"))

const PORT = process.env.PORT || 3001;

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message })
})

app.listen(PORT, () => {
  console.log("Server started at port " + PORT);
})