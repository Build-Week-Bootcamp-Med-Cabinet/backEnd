const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const authenticate = require('../auth/auth-middleware');
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/userRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(cookieParser());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);

server.use('/', (req, res, next) => {
	try {
		res.status(200).json({ message: 'Welcome to the API. Please find all API docs online in the GITHUB Repo!' });
	} catch (err) {
		next(err);
	}
});

module.exports = server;
