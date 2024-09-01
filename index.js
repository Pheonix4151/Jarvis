const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SkillSphere',
    password: 'pheonix4151'
});

// Routes
app.get('/', (req, res) => {
    res.render('usage.ejs'); // This is the first page where the user selects their role
});



// GET request to render the student login/signup page
app.get('/user/student/login', (req, res) => {
    res.render('loginstudent.ejs');
});

app.get('/user/teacher/login', (req, res) => {
    res.render('loginteacher.ejs');
});



// POST Sign up route for teacher and students
app.post('/user/student/signup', (req, res) => {
    const { username, email, password } = req.body;
    let id = uuid();
    const query = `INSERT INTO student (id, username, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(query, [id, username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ', err);
            res.status(500).send('Error saving user data. Please try again.');
        } else {
            res.send('User registered successfully!');
            console.log(username);
            console.log(id);
            console.log(password);
            console.log(email);
        }
    });
});

app.post('/user/teacher/signup', (req, res) => {
    const { username, email, password } = req.body;
    let id = uuid();
    const query = `INSERT INTO teacher (id, username, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(query, [id, username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ', err);
            res.status(500).send('Error saving user data. Please try again.');
        } else {
            res.send('User registered successfully!');
            console.log(username);
            console.log(id);
            console.log(password);
            console.log(email);
        }
    });
});



// POST Sign in route for teacher and students

app.post('/user/student/signin', (req, res) => {
    const { username, password } = req.body;
    let q = `SELECT * FROM student WHERE username = ?`;
    connection.query(q, [username], (err, result) => {
        if (err) {
            console.error('Error retrieving user data: ', err);
            res.status(500).send('An error occurred.');
        } else if (result.length === 0) {
            res.send("User not found");
        } else {
            let user = result[0];
            if (password !== user.password) {
                res.send("Password incorrect");
            } else {
                res.send("Login successful");
            }
        }
    });
});


app.post('/user/teacher/signin', (req, res) => {
    const { username, password } = req.body;
    let q = `SELECT * FROM teacher WHERE username = ?`;
    connection.query(q, [username], (err, result) => {
        if (err) {
            console.error('Error retrieving user data: ', err);
            res.status(500).send('An error occurred.');
        } else if (result.length === 0) {
            res.send("User not found");
        } else {
            let user = result[0];
            if (password !== user.password) {
                res.send("Password incorrect");
            } else {
                res.send("Login successful");
            }
        }
    });
});




// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
