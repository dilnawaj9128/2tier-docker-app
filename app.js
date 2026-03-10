const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "notesdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get('/', (req, res) => {
  db.query("CREATE TABLE IF NOT EXISTS notes (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255))");

  db.query("INSERT INTO notes (text) VALUES ('Hello from Docker App')");

  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      res.send("Database error");
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});