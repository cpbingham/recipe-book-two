import express from 'express';
import * as RecipesController from '../controllers/recipes';

const Recipes = () => {
	const router = express.Router();

	router.get('/', RecipesController.getRecipes);

	router.get('/:id', RecipesController.getRecipe);

	router.post('/', RecipesController.createRecipe);

	router.put('/:id', RecipesController.updateRecipe);

	router.delete('/:id', RecipesController.deleteRecipe);

	return router;
};

export { Recipes };
