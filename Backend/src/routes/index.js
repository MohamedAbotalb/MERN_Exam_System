const { Router } = require('express');
const userRouter = require('./api/user.route');
const questionRouter = require('./api/question.route');
const examRouter = require('./api/exam.route');
const resultRouter = require('./api/result.route');

const router = Router();

router.use('/users', userRouter);
router.use('/questions', questionRouter);
router.use('/exams', examRouter);
router.use('/results', resultRouter);

module.exports = router;
