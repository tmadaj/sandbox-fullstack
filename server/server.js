require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user');
const restaurantRoute = require('./routes/restaurant');
const reviewRoute = require('./routes/review');

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('DB connected'),
);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/review', reviewRoute);

app.listen(process.env.PORT, () => console.log(`Server running at :${process.env.PORT}`));
