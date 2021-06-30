import crypto from 'crypto';
import expressJWT from 'express-jwt';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import { Users as UsersModel } from '../models/users';

const secret = process.env.JWT_SECRET;

const iterations = process.env.NODE_ENV === 'production' ? 1000 : 1;

const sixtyDaysInSeconds = 60 * 60 * 24 * 60;

const getSaltAndHash = (password) => {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, iterations, 512, 'sha512')
		.toString('hex');
	return { salt, hash };
};

const isPasswordValid = (password, { salt, hash }) => {
	return (
		hash ===
		crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512').toString('hex')
	);
};

const getUserToken = ({ id, username }) => {
	const issuedAt = Math.floor(Date.now() / 1000);
	let result = jwt.sign(
		{
			id,
			username,
			iat: issuedAt,
			exp: issuedAt + sixtyDaysInSeconds,
		},
		secret,
	);
	return result;
};

const authMiddleware = expressJWT({ algorithms: ['HS256'], secret });

const getLocalStrategy = () => {
	return new LocalStrategy(async (username, password, done) => {
		let user;
		try {
			user = await UsersModel.findOne({ username: username });
		} catch (error) {
			return done(error);
		}
		if (!user || !isPasswordValid(password, user)) {
			return done(null, false, {
				message: 'username or password is incorrect',
			});
		}
		return done(null, userToJSON(user));
	});
};

const userToJSON = (user) => {
	let {_id, username} = user
	return {_id, username};
};

export {
	authMiddleware,
	getSaltAndHash,
	userToJSON,
	getLocalStrategy,
	getUserToken,
};
