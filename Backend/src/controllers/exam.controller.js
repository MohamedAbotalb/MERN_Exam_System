const mongoose = require('mongoose');
const Exam = require('../models/exam.model');
const Question = require('../models/question.model');
const Result = require('../models/result.model');

const addExam = async (req, res, next) => {
  try {
    const { name, totalMarks, passMarks, totalQuestions } = req.body;

    let exam = await Exam.findOne({ name });
    if (exam)
      return res.status(400).json({
        success: false,
        message: 'Exam with this name is already exist',
      });

    exam = await Exam.create({ name, totalMarks, passMarks, totalQuestions });
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

const getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.status(200).json({ success: true, data: exams });
  } catch (error) {
    next(error);
  }
};

const getExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId).populate('questions');

    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

const updateExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { name, totalMarks, passMarks, totalQuestions } = req.body;

    // Check if the updated exam name already exists
    if (name) {
      const existingExam = await Exam.findOne({ name, _id: { $ne: examId } });
      if (existingExam) {
        return res
          .status(400)
          .json({ success: false, message: 'Exam name must be unique' });
      }
    }

    const exam = await Exam.findByIdAndUpdate(
      examId,
      { name, totalMarks, passMarks, totalQuestions },
      { new: true }
    );

    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

const deleteExam = async (req, res, next) => {
  try {
    const { examId } = req.params;

    // Find the exam to delete
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    // Delete all questions related to the exam
    await Question.deleteMany({ exam: examId });

    // Delete the exam itself
    await Exam.findByIdAndDelete(examId);

    res.status(200).json({
      success: true,
      message: 'Exam and related questions deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Add a new question to exam
const addQuestionToExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { name, options, correctAnswer } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    // Check if question with the same name already exists for this exam
    const existingQuestion = await Question.findOne({ exam: examId, name });
    if (existingQuestion) {
      return res.status(400).json({
        success: false,
        message: 'Question name must be unique within the exam',
      });
    }

    // Check if the exam already has the maximum number of questions
    if (exam.totalQuestions === exam.questions.length)
      return res.status(400).json({
        success: false,
        message:
          'Cannot add more than ${exam.totalQuestions} questions to this exam',
      });

    const question = await Question.create({
      exam: examId,
      name,
      options,
      correctAnswer,
    });

    exam.questions.push(question);
    await exam.save();

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
};

const getQuestionsForExam = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, data: exam.questions });
  } catch (error) {
    next(error);
  }
};

const updateQuestionInExam = async (req, res, next) => {
  try {
    const { examId, questionId } = req.params;
    const { name, options, correctAnswer } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    // Check if question with the same name exists for this exam (excluding the current question)
    const existingQuestion = await Question.findOne({
      exam: examId,
      name,
      _id: { $ne: questionId },
    });
    if (existingQuestion) {
      return res
        .status(400)
        .json({ error: 'Question name must be unique within the exam' });
    }

    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        name,
        options,
        correctAnswer,
      },
      { new: true }
    );
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
};

/// remove question from exam
const removeQuestionFromExam = async (req, res, next) => {
  try {
    const { examId, questionId } = req.params;
    const exam = await Exam.findByIdAndUpdate(
      examId,
      { $pull: { questions: questionId } },
      { new: true }
    );
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: 'Exam not found' });
    }

    // Remove the question from the database
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

const getAvailableExamsForUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'You are not authenticated' });
    }

    // Find exams that the user has not taken based on their ID not being in results.user
    const takenExams = await Result.find({ user: userId }).distinct('exam');

    // Convert takenExamIds to ObjectId array
    const takenExamIds = takenExams.map((examId) =>
      mongoose.Types.ObjectId(examId)
    );

    // Find exams where the _id is not in takenExamObjectIds
    const examsNotTaken = await Exam.find({
      _id: { $nin: takenExamIds },
    }).populate('questions');

    res.status(200).json({ success: true, data: examsNotTaken });
  } catch (error) {
    next(error);
  }
};


const getExamsCount = async(req, res, next)=>{
  try{
    const examsCount = await Exam.countDocuments();
  res.status(200).json({ success: true, data: examsCount });
} catch (error) {
  next(error);
}
}

module.exports = {
  addExam,
  getExam,
  getExams,
  updateExam,
  deleteExam,
  getExamsCount,
  addQuestionToExam,
  getQuestionsForExam,
  updateQuestionInExam,
  removeQuestionFromExam,
  getAvailableExamsForUser,
};
