//Dependencies
//interaction with front end
const express = require("express");
//path file names
const path = require("path");
//to read and write files
const fs = require("fs");
//express server
const app = express();
const db = require("./db/db.json");
//set for listening
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));


//get API notes-sends user to AJAX page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
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
  db.splice(chosenNote, 1);
});




//server listening
app.listen(PORT, function() {
  console.log("API listening on PORT" + PORT);
});
