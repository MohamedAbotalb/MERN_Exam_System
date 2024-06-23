const Result = require('../models/result.model');
const Exam = require('../models/exam.model');

const submitResult = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { examId, answers } = req.body;

    // Check if the user has already taken the exam
    const existingResult = await Result.findOne({ user: userId, exam: examId });
    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: 'Result already exists for this exam',
      });
    }

    // Get the exam details including questions
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    let score = 0;
    const { totalMarks, passMarks, totalQuestions, questions } = exam;
    const markPerQuestion = totalMarks / totalQuestions;

    // Calculate the score
    for (const question of questions) {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question._id.toString()
      );
      if (userAnswer && userAnswer.answer === question.correctAnswer) {
        score += markPerQuestion;
      }
    }

    // Determine if the user passed or failed
    const status = score >= passMarks ? 'passed' : 'failed';

    // Create a new result
    const result = await Result.create({
      user: userId.toString(),
      exam: examId.toString(),
      score,
      status,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find().populate('exam').populate('user');
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const getResultById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id).populate('exam').populate('user');
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Result not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getUserResults = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ user: userId })
      .populate('exam')
      .populate('user');

    if (!results.length) {
      return res
        .status(404)
        .json({ success: false, message: 'No results found for this user' });
    }
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const getResultsForLoggedInUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'You are not authenticated' });
    }

    const results = await Result.find({ user: userId })
      .populate('exam')
      .populate('user');

    if (!results.length) {
      return res
        .status(404)
        .json({ success: false, message: 'No results found for this user' });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findByIdAndDelete(id);

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: 'Result not found' });

    res
      .status(200)
      .json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getResultsCount = async (req, res, next) => {
  try {
    const resultsCount = await Result.countDocuments();
    res.status(200).json({ success: true, data: resultsCount });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitResult,
  getResultById,
  getResultsCount,
  getAllResults,
  getUserResults,
  getResultsForLoggedInUser,
  deleteResult,
};
