const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./connection");
const login = require("../controller/login");
const add = require("../controller/add");
const update = require("../controller/update");

// server port
// http://localhost:3001
const port = 3001;

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

// - - - LOGIN AND AUTH - - -
login(app);

// - - - ADD USER - - -
add(app);

// - - - UPDATE USER - - -
update(app);

// localhost:3001/
app.get("/", (req, res) => {
  // redirect users to login page
  res.redirect("/login");
});

// GET ALL ACCOUNTS
app.get("/accounts", (req, res) => {
  query = "SELECT * FROM accounts";
  connection.query(query, (error, result) => {
    if (error) console.log(error);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
