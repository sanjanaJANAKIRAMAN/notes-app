const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "notes.json";

// Get notes
app.get("/notes", (req, res) => {
    if (!fs.existsSync(FILE)) return res.json([]);
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// Add note
app.post("/notes", (req, res) => {
    const { text } = req.body;

    let notes = [];
    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE));
    }

    const newNote = {
        id: Date.now(),
        text
    };

    notes.push(newNote);
    fs.writeFileSync(FILE, JSON.stringify(notes));

    res.json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;

    let notes = JSON.parse(fs.readFileSync(FILE));

    notes = notes.filter(n => n.id != id);

    fs.writeFileSync(FILE, JSON.stringify(notes));

    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});