const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM schools");
    console.log(data);
    res.status(200).json(data.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    const data = await pool.query(
      "INSERT INTO schools (name, address) VALUES ($1, $2)",
      [name, location]
    );
    console.log(data);
    res.status(200).json({ message: "Successfully added student" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/setup", async (req, res) => {
  try {
    const data = await pool.query(
      "CREATE TABLE schools (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    console.log(data);
    res.status(200).json({ message: "Successfully created table" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
