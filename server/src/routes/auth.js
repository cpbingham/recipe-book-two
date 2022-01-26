import express from 'express';
import { authMiddleware } from '../utils/auth';
import * as AuthController from '../controllers/auth';

const Auth = () => {
	const router = express.Router();

	router.post('/register', AuthController.register);
	router.post('/login', AuthController.login);
	router.get('/me', authMiddleware, AuthController.me);

	return router;
};

export { Auth };
