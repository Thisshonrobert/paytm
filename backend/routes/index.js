const express = require('express');
const rootRouter = express.Router();
const userRouter = require('./user');
const accountRouter = require('./accounts')
rootRouter.use('/user',userRouter)
rootRouter.use('/account',accountRouter)

module.exports = rootRouter;