const express = require('express');
const cors = require('cors');
const route = require('./routes');
const db = require('~/config/mongodb');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());

app.use(express.json()); // Để xử lý JSON

const port = 8020;

// Routes init
route(app);

// Connect db
db.connect();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello Luongdz, I am running at ${port}/`);
});