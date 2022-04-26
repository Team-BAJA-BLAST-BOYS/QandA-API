require('dotenv').config();
const express = require('express');
const Routers = require('./routes');

let app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // req.body

// ROUTES
app.use('/qa', Routers);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})