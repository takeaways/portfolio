const express = require("express");
const app = express();

const createError = require("http-errors");

const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const jsend = require("jsend");

const cookie = require("cookie-parser");
const session = require("express-session");

//router
const postRouter = require("./Routers/post");
const userRouter = require("./Routers/user");



app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(jsend.middleware);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/', express.static('static'));
app.use('/', express.static('Uploads'));


// app.get("/", (req, res) => {
//     res.render("index.html")
// })
// app.get("/login", (req, res) => {
//     res.render("login.html")
// })
app.use("/user", userRouter);
app.use("/post", postRouter);


app.use((req, res, next) => {
    next(createError(404))
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status);
    res.json({
        status: "error",
        message: message,
    });
})


module.exports = app;