const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cors = require("cors");
const flash = require("connect-flash");
const passport = require("passport");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const port = parseInt(process.env.PORT, 10) || 3000;

require("dotenv").config();
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler();

const mongooseOptions = {
    useNewUrlParser: true,
    user: "youna",
    pass: "dbsk1234"
}
const mongoURL = "mongodb+srv://youna:dbsk1234@board.jaulo.mongodb.net/giveaway?retryWrites=true&w=majority";

mongoose.connect(mongoURL, mongooseOptions).then(()=>console.log("DB connected..."));
mongoose.connection.on("error", err=>console.log(`DB connection error : ${err.message}`));

app.prepare().then(()=>{
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    const sessionConfig = {
        name: "next-connext.sid",
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({
            mongoUrl: mongoURL,
            collection: "sessions",
            autoReconnect: true
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    }

    server.use(session(sessionConfig));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());
    server.use(cors());

    server.use("/", routes);

    server.all("*", (req, res)=>{
        return handle(req, res);
    });

    server.listen(port, ()=>{
        console.log(`Ready on http://localhost:${port}`);
    })
});

