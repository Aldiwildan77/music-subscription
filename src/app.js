const express = require("express");
const { PORT } = require("./config/index")
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  })
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})