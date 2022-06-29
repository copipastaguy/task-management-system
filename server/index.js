const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./connection");
const login = require("../controller/login");
const add = require("../controller/add");
const update = require("../controller/update");
const accounts = require("../controller/accounts");

// server port
// http://localhost:3002
const port = 3002;

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// - - - ALL ACCOUNTS - - -
accounts(app);

// - - - LOGIN AND AUTH - - -
login(app);

// - - - ADD USER - - -
add(app);

// - - - UPDATE USER - - -
update(app);

// localhost:3002/
app.get("/", (req, res) => {
  // redirect users to login page
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
