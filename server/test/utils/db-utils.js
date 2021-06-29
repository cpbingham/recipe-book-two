import { Recipes as RecipesModel } from '../../src/models/recipes';
import * as generate from './generate';

const initDb = async ({
	recipes = Array.from({ length: 100 }, () => generate.buildRecipe()),
} = {}) => {
	await Promise.all([RecipesModel.insertMany(recipes)]);
	return { recipes };
};

const resetDb = () => {
	RecipesModel.collection.drop();
};

export { initDb, resetDb, generate };
