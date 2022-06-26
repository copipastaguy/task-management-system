const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./connection");
const login = require("../controller/login");
const add = require("../controller/add");
const update = require("../controller/update");

// port for localhost
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
app.use(bodyParser.json());

// - - - LOGIN AND AUTH - - -
login(app);

// - - - ADD USER - - -
add(app);

// - - - UPDATE USER - - -
update(app);

// localhost:3000/
app.get("/", (req, res) => {
  // redirect users to login page
  res.redirect("/login");
});

// GET ALL ACCOUNTS
app.get("/accounts", (req, res) => {
  query = "SELECT * FROM accounts";
  connection.query(query, (error, result) => {
    if (error) console.log(error);
    // res.send(result);
    res.send(result[0]);
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
