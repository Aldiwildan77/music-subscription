const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const customerModule = require('./src/modules/customer/customer.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send("Hello on API v1");
});

app.use('/customer', customerModule);

app.listen(3000, () => {
  console.log("App running in 3000");
});