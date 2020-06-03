const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: { type: String, required: true, min: 2, max: 127, trim: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = model('Restaurant', restaurantSchema);
