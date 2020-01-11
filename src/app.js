const express = require("express");
const { PORT } = require("./config/index")
const app = express();
const cors = require("cors");
const customerRoute = require("./routes/Customer");
const subscriptionRoute = require("./routes/Subscription");
const transactionRoute = require("./routes/Transaction");
app.use(cors())
app.use(express.json())
app.use("/customer", customerRoute);
app.use("/subscription", subscriptionRoute);
app.use("/transaction", transactionRoute);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  })
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})