const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true, min: 4, max: 63, trim: true },
  role: { type: String, required: true, enum: ['regular', 'owner', 'admin'] },
  email: { unique: true, type: String, required: true, min: 6, max: 255, trim: true },
  password: { type: String, required: true, min: 8, max: 1023 },
  date: { type: Date, default: Date.now },
});

module.exports = model('User', userSchema);
