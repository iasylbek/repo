const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Free User', 'Paid User'],
    default: 'Free User',
  },
});

module.exports = mongoose.model('User', UserSchema);
