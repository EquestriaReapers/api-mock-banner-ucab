require('dotenv').config();
const { Router } = require("express");
const router = Router();
const apiStudentRouter = require('./api/student');

router.use('/student', apiStudentRouter);


module.exports = router;