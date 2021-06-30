import express from 'express';
import { Recipes as RecipesRoutes } from './recipes';
import { Auth as AuthRoutes } from './auth';

const Router = () => {
	const router = express.Router();
	router.use('/auth', AuthRoutes());
	router.use('/recipes', RecipesRoutes());
	return router;
};

export default Router;
