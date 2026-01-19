require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* Routes */
app.use('/api/visits', require('./routes/visit'));
app.use('/api/board', require('./routes/board'));
app.use('/api', require('./routes/auth'));

/* Health check (important) */
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
