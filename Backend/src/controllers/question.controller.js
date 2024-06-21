const Question = require('../models/question.model');

const addQuestion = async (req, res) => {
  try {
    const question = req.body;
    const newQuestion = new Question(question);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, question, {
      new: true,
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
