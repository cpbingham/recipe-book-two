import {
	id,
	description,
	buildReq,
	buildRes,
	buildRecipe,
} from '../../../test/utils/generate';
import { Recipes as RecipesModel } from '../../models/recipes';
import * as RecipesController from '../recipes';

jest.mock('../../models/recipes');

beforeEach(() => {
	jest.resetAllMocks();
});

test('getRecipe returns the req.recipe', async () => {
	const recipe = buildRecipe();
	const recipeId = id();

	RecipesModel.findById.mockResolvedValueOnce({
		_id: recipeId,
		...recipe,
	});

	const req = buildReq({ params: { id: recipeId } });
	const res = buildRes();

	await RecipesController.getRecipe(req, res);

	expect(RecipesModel.findById).toHaveBeenCalledWith(recipeId);
	expect(RecipesModel.findById).toHaveBeenCalledTimes(1);

	expect(res.json).toHaveBeenCalledWith({
		recipe: {
			_id: recipeId,
			...recipe,
		},
	});
	expect(res.json).toHaveBeenCalledTimes(1);
});

test('getRecipes returns all recipes', async () => {
	const recipes = [
		{
			_id: id(),
			...buildRecipe(),
		},
		{
			_id: id(),
			...buildRecipe(),
		},
	];

	RecipesModel.find.mockResolvedValueOnce(recipes);

	const req = buildReq();
	const res = buildRes();

	await RecipesController.getRecipes(req, res);

	expect(RecipesModel.find).toHaveBeenCalledWith();
	expect(RecipesModel.find).toHaveBeenCalledTimes(1);

	expect(res.json).toHaveBeenCalledWith({
		recipes: recipes,
	});
	expect(res.json).toHaveBeenCalledTimes(1);
});

test('createRecipe creates and returns a recipe', async () => {
	const recipe = buildRecipe();

	RecipesModel.create.mockResolvedValueOnce(recipe);

	const req = buildReq({ body: recipe });
	const res = buildRes();

	await RecipesController.createRecipe(req, res);

	expect(RecipesModel.create).toHaveBeenCalledWith(recipe);
	expect(RecipesModel.create).toHaveBeenCalledTimes(1);

	expect(res.json).toHaveBeenCalledWith({
		recipe: recipe,
	});
	expect(res.json).toHaveBeenCalledTimes(1);
});

test('updateRecipe updates an existing recipe', async () => {
	const recipeId = id();
	const recipe = {
		_id: recipeId,
		...buildRecipe(),
	};
	const updates = { description: description() };

	const mergedRecipeAndUpdates = { ...recipe, ...updates };

	RecipesModel.findByIdAndUpdate.mockResolvedValueOnce(mergedRecipeAndUpdates);

	const req = buildReq({ params: { id: recipeId }, body: updates });
	const res = buildRes();

	await RecipesController.updateRecipe(req, res);

	expect(RecipesModel.findByIdAndUpdate).toHaveBeenCalledWith(
		recipeId,
		updates,
		{ new: true },
	);
	expect(RecipesModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);

	expect(res.json).toHaveBeenCalledWith({
		recipe: mergedRecipeAndUpdates,
	});
	expect(res.json).toHaveBeenCalledTimes(1);
});

test('deleteRecipe deletes an existing recipe', async () => {
	const recipeId = id();

	const req = buildReq({ params: { id: recipeId } });
	const res = buildRes();

	await RecipesController.deleteRecipe(req, res);

	expect(RecipesModel.findOneAndDelete).toHaveBeenCalledWith({
		_id: recipeId,
	});
	expect(RecipesModel.findOneAndDelete).toHaveBeenCalledTimes(1);

	expect(res.json).toHaveBeenCalledWith({ success: true });
	expect(res.json).toHaveBeenCalledTimes(1);
});
