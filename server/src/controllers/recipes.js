import { Recipes as RecipesModel } from '../models/recipes';

const getRecipes = async (req, res) => {
	const recipes = await RecipesModel.find();
	res.json({ recipes: recipes });
};

const getRecipe = async (req, res) => {
	res.json({ recipe: await RecipesModel.findById(req.params.id) });
};

const createRecipe = async (req, res) => {
	const recipe = await RecipesModel.create(req.body);
	res.json({ recipe: recipe });
};

const updateRecipe = async (req, res) => {
	// console.log(`updateReq`, req.params);
	const updatedRecipe = await RecipesModel.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true },
	);
	res.json({ recipe: updatedRecipe });
};

const deleteRecipe = async (req, res) => {
	await RecipesModel.findOneAndDelete({ _id: req.params.id });
	res.json({ success: true });
};

export { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe };
