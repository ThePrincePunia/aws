const express = require('express');
const mongoose = require('mongoose'); // Add connection logic if using MongoDB

const app = express();
const port = 3000;

app.use(express.json());

let kidneyCount = 100;
let heartCount = 100;

app.get('/', (req, res) => {
  res.send("Your server is working!");
});

app.get('/health', (req, res) => {
  res.json({ health: "100" });
});

app.post('/appointment', (req, res) => {
  const { name, age, gender, address, problem } = req.body;
  
  // Fixed: use || so it checks if either name OR problem is missing
  if (!name || !problem) {
    return res.status(400).json({ error: "Name and problem are required fields." });
  }

  console.log(`Appointment booked for: ${name}`);
  res.json({ 
    message: "Your appointment has been booked successfully", 
    details: { name, age, gender, address, problem } 
  });
});

app.get('/heart', (req, res) => {
  if (heartCount > 0) {
    heartCount -= 1;
    res.json({ message: "Heart assigned to patient", remainingHearts: heartCount });
  } else {
    res.json({ message: "No heart available" });
  }
});

app.get('/kidney', (req, res) => {
  if (kidneyCount > 0) {
    kidneyCount -= 1;
    res.json({ message: "Kidney assigned to patient", remainingKidneys: kidneyCount });
  } else {
    res.json({ message: "No kidneys available" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
