//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const db = require("./public/index.html");
const PORT = process.env.PORT || 3000;

//get API notes-sends user to AJAX page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(_dirname, "./public/notes.html"));
});

// displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(db);
});

//post API notes
app.post("api/notes", function(req, res) {
  let newNote = req.body;
  newNote["id"] = db.length;
  console.log(newNote);
  db.push(newNote);
});
fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
  if (err) throw err;
  console.log("Noted");
});

//delete notes
app.delete("/api/notes/:id", function(req, res) {
  const chosenNote = req.params.id;
  console.log(chosenNote);
  console.log(db);
});

//server listening
app.listen(PORT, function() {
  console.log("API listening on PORT" + PORT);
});
