const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//log schema (to be embedded in exercise schema)
const logSchema = new Schema({
  exerciseName: {type: String},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: {type: String},
  userAvatar: {type: String},
  time: Date,
  weightUsed: Number,
  reps: Number,
  sets: Number,
  restTime: Number,
  notes: String,
  workVol: {
    type: Number,
    default: function() {
      return log.weightUsed * log.reps * log.sets;
    }
  },
  workEff: {
        type: Number,
        default: function() {
            return workVol/(restTime*(sets-1));
        }
  }
}, {
  timestamps: true
});


//exercise schema (with log schema embedded)
const exerciseSchema = new Schema({
  name: {type: String, required: true},
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  creatorName: {type: String},
  description: {type: String},
  bodyPart: {type: String, enum: ['Upper Body', 'Lower Body', 'Full Body', 'Other']}, 
  demo: {type: String},
  favoritedBy: [Schema.Types.ObjectId],
  logs: [logSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);