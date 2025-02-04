const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Server running on port 3000"));

let users = [];  // Array to store user data

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully!" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials!" });
    }
});


app.get("/search", (req, res) => {
    const { username } = req.query; // Get username from query parameters
    const user = users.find(u => u.username === username);

    if (user) {
        res.json({ message: "User found!", user });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});

app.put("/update", (req, res) => {
    const { username, newPassword } = req.body;
    let user = users.find(u => u.username === username);

    if (user) {
        user.password = newPassword;
        res.json({ message: "Profile updated successfully!" });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});


app.delete("/delete", (req, res) => {
    const { username } = req.body;
    users = users.filter(u => u.username !== username);
    res.json({ message: "User deleted successfully!" });
});

