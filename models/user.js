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
  birthday: Date,
  age: {
      type: Number, 
      default: function(){
        // to be coded...
            //if birthday is undefined --> age = undefined
            //if birthday is defined --> run fuction that takes bday and returns age in years 
        let today = new Date();
        let yrsOld = 20;
        return yrsOld;
      }
  },
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