const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});

module.exports = model('Question', questionSchema);
