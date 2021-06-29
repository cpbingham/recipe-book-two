import express from 'express';
import { Recipes as RecipesRoutes } from './recipes';

const Router = () => {
	const router = express.Router();
	router.use('/recipes', RecipesRoutes());
	return router;
};

export default Router;
