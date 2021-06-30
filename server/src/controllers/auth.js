import passport from 'passport';
import { getSaltAndHash, userToJSON, getUserToken } from '../utils/auth';
import { Users as UsersModel } from '../models/users';

const authUserToJSON = (user) => ({
	...userToJSON(user),
	token: getUserToken(user),
});

const register = async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		return res.status(400).json({ message: `username can't be blank` });
	}
	if (!password) {
		return res.status(400).json({ message: `password can't be blank` });
	}
	const existingUser = await UsersModel.findOne({ username: username });
	if (existingUser) {
		return res.status(400).json({ message: `username taken` });
	}

	const newUser = await UsersModel.create({
		username,
		...getSaltAndHash(password),
	});
	
	return res.json({ user: authUserToJSON(newUser) });
};

const login = async (req, res, next) => {
	if (!req.body.username) {
		return res.status(400).json({ message: `username can't be blank` });
	}

	if (!req.body.password) {
		return res.status(400).json({ message: `password can't be blank` });
	}

	const { user, info } = await authenticate(req, res, next);

	if (user) {
		return res.json({ user: authUserToJSON(user) });
	} else {
		return res.status(400).json(info);
	}
};

const authenticate = (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', { session: false }, (err, user, info) => {
			if (err) {
				reject(err);
			} else resolve({ user, info });
		})(req, res, next);
	});
};

const me = (req, res) => {
	if (req.user) {
		return res.json({ user: authUserToJSON(req.user) });
	} else {
		return res.status(404).send();
	}
};

export { me, login, register };
