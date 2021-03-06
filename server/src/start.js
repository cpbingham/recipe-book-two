import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import mongoose from 'mongoose';
import { getLocalStrategy } from './utils/auth';
import Router from './routes';

const server = ({ port = process.env.PORT || 5000 } = {}) => {
	const app = express();
	app.use(cors());
	app.use(bodyParser.json());
	app.use(passport.initialize());
	passport.use(getLocalStrategy());

	const router = Router();
	app.use('/api', router);
	app.use((err, req, res, next) => {
		console.log(err);
		next();
	});

	return new Promise((resolve) => {
		const server = app.listen(port, () => {
			console.log(`Server running on port ${port}`);
			const originalClose = server.close.bind(server);
			server.close = () => {
				return new Promise((resolveClose) => {
					originalClose(resolveClose);
				});
			};
			resolve(server);
		});
	});
};

const db = () => {
	mongoose.Promise = global.Promise;

	return new Promise((resolve) => {
		const db = mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		resolve(db);
	});
};

export { server, db };
