const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  images: { type: [String], required: true },
}, { timestamps: true });

carSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Car', carSchema);
