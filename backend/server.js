import express from "express";   
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// route
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
