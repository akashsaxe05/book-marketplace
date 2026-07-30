const mongoose = require('mongoose');
require('dotenv').config();

const pathdb = process.env.MONGODB_URL || process.env.MONGO_URI;

mongoose.connect(pathdb).then(() => {
  console.log('connected to mongooDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error.message);
  throw error;
});
const bookSchema = mongoose.Schema({
  bookname: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, default: '' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sold: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  purchaseInfo: {
    paymentMethod: { type: String, enum: ['points', 'online', 'other', 'none'], default: 'none' },
    usedPoints: { type: Boolean, default: false },
    purchasedAt: { type: Date }
  }
});

module.exports = mongoose.model('book', bookSchema);