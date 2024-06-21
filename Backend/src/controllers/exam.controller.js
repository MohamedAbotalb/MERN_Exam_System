const Exam = require('../models/exam.model');

const addExam = async (req, res) => {
  const { name, questions } = req.body;
  const exam = new Exam({ name, questions });
  const result = await exam.save();
  res.status(201).json(result);
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate('questions');
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  const { name, questions } = req.body;
  const { id } = req.params;
  try {
    const exam = await Exam.findByIdAndUpdate(
      id,
      { name, questions },
      { new: true }
    );
    res.status(204).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// remove question from exam
const removeQuestionFromExam = async (req, res) => {
  const { examId, questionId } = req.params;
  try {
    const exam = await Exam.findByIdAndUpdate(
      examId,
      { $pull: { questions: questionId } },
      { new: true }
    );
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add question to exam
const addQuestionToExam = async (req, res) => {
  const { examId, questionId } = req.params;
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    if (!exam.questions.includes(questionId)) {
      exam.questions.push(questionId);
      console.log(exam);
      await exam.save();
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExam,
  getExam,
  getExams,
  updateExam,
  addQuestionToExam,
  removeQuestionFromExam,
};
