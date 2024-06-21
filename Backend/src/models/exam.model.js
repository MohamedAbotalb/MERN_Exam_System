const { Schema, model } = require('mongoose');

const examSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Exam', examSchema);
