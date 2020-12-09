const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String, 
  birthday: {
    type: Date, 
    default: function () {
      let bday = new Date();
      return bday;
    },
  age: {type: Number, default: 20},
  height: Number, 
  weight: Number,
  gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'n/a']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);