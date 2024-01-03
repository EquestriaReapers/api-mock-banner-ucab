require('dotenv').config();
const { Router } = require("express");
const router = Router();
const apiStudentRouter = require('./api/student');
const apiRolRouter = require('./api/role');
const apiCareerRouter = require('./api/career');

router.use('/student', apiStudentRouter);
router.use('/rol', apiRolRouter);
router.use('/career', apiCareerRouter);


module.exports = router;