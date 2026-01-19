require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

/* -------------------- MongoDB -------------------- */
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, { dbName: 'pet_app' })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

/* -------------------- Routes -------------------- */
app.use('/api/visits', require('./routes/visit'));
app.use('/api/board', require('./routes/board'));
app.use('/api', require('./routes/auth'));

/* -------------------- Razorpay -------------------- */
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} else {
  console.warn("Razorpay keys not found, payment API disabled");
}

/* -------------------- Payment Route -------------------- */
app.post('/api/payment/orders', async (req, res) => {
  if (!razorpay) {
    return res.status(500).json({ error: "Payment service not configured" });
  }

  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `re
