import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";

dotenv.config({
  path: ".env",
});

const app = express();

console.log("hey!!!");

// Middleware

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
console.log(`Session_secret key ${process.env.SESSION_SECRET}`);

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "layout");


//Routes
//Home page
app.get("/", (req, res) => {
  res.render("layout", { title: "Home- OTP Auth System" });
});


app.get("/login", (req, res) => {
  res.render("login", { title: "Login- OTP Auth System" });
});

//Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running at Port : ${PORT}`);
});
