import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password", // Change this to your MySQL password
    database: "form_app"
});

// Check database connection
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL");
});

// API endpoint to submit the menu
app.post("/submit-menu", (req, res) => {
    const formData = req.body;
    console.log("Received formData:", formData); // Log received data

    let query = "INSERT INTO party_menu (section, item, quantity) VALUES ?";
    let values = [];

    Object.entries(formData).forEach(([section, data]) => {
        if (data.item) {
            values.push([section, data.item, data.quantity]);
        }
    });

    if (values.length > 0) {
        db.query(query, [values], (err, result) => {
            if (err) {
                console.error("MySQL Error:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Menu submitted successfully", result });
        });
    } else {
        console.log("No menu items selected");
        res.status(400).json({ error: "No menu items selected" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
