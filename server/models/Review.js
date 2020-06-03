const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true, min: 2, max: 4096, trim: true },
  reply: { type: String, max: 4096, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = model('Reviews', reviewSchema);
