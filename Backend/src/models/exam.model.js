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
  totalQuestions: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  passMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Exam', examSchema);
