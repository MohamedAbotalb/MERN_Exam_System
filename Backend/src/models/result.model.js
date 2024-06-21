const { Schema, model } = require('mongoose');

const resultSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Result', resultSchema);
