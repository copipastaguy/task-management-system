<h1>MERN STACK TASK MANAGEMENT</h1>

- Server running on port 3002
- View running on port 3000
- include res.send() to get a response on react

- `npm start` in root folder to run concurrently scripts

<h3>Setting up environment</h3>

- [x] mySQL MODEL
- [ ] Expressjs CONTROLLER
- [ ] Reactjs VIEW
- [x] Nodejs SERVER

<h2>Login</h2> 
POST request to send input to database and check

http://localhost:3000/login

- [x] login screen
- [x] validate if user exist

<h2>User Management</h2>
POST request to add users from input

http://localhost:3000/management

- [x] add user
- [x] validate if user exist
- [x] add username, password, email, group

run database for login user  
check if column value is empty

- [x] update password for current user
- [x] update email for current user
- [x] update group for current user

<h2>User Group Management</h2>

- [x] change input to option for group
- [] check if user is in a group

<h2>Privilege User Management & Security</h2>

- [] admin account
  - [] create user
  - [] disable user
  - [] reset account details
- [] password encryption
- [] 8-10 characters (numbers, alphabets, special characters)
