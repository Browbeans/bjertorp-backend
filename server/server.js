const cookieSession = require("cookie-session");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./users/user.router");
const postRouter = require("./posts/post.router");

const app = express();
const PORT = process.env.PORT || 6000;

const uri =
    "mongodb+srv://BjertorpAdmin:Freak219@cluster0.whre4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(uri, options)
    .then((result) => app.listen(PORT))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "session",
        secret: "s3cr3tK3y",
        secure: false,
        maxAge: 1000 * 60,
        httpOnly: true,
    })
);

app.use(userRouter);
app.use(postRouter);

app.get("/", (req, res) => {
    console.log("Server Connected");
});
