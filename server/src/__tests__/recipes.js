import { resetDb } from '../../test/utils/db-utils';
import axios from 'axios';
import { getData, handleRequestFailure, resolve } from '../../test/utils/async';
import * as generate from '../../test/utils/generate';
import { Recipes as RecipesModel } from '../models/recipes';
import * as Start from '../start';

let baseURL, server, db;

beforeAll(async () => {
	server = await Start.server();
	db = await Start.db();
	baseURL = `http://localhost:${server.address().port}/api`;
});

afterAll(() => {
	server.close();
	db.connection.close();
});

beforeEach(() => resetDb());

const setup = async () => {
	const API = axios.create({ baseURL });
	API.interceptors.response.use(getData, handleRequestFailure);
	return API;
};

test('recipe CRUD', async () => {
	const API = await setup();
	const recipe = generate.buildRecipe();
	await RecipesModel.create(recipe);

	// CREATE
	const cData = await API.post('recipes', recipe);

	expect(cData.recipe).toMatchObject({
		name: recipe.name,
		description: recipe.description,
		prepTime: recipe.prepTime,
		cookTime: recipe.cookTime,
	});
	const recipeId = cData.recipe._id;
	const recipeIdUrl = `recipes/${recipeId}`;

	// READ
	const rData = await API.get(recipeIdUrl);
	expect(rData.recipe).toEqual(cData.recipe);

	// UPDATE
	const updates = { description: generate.description() };
	const uResult = await API.put(recipeIdUrl, updates);
	expect(uResult.recipe).toEqual({ ...rData.recipe, ...updates });

	// DELETE
	const dData = await API.delete(recipeIdUrl);
	expect(dData).toEqual({ success: true });
	const error = await API.get(recipeIdUrl).catch(resolve);
	// expect(error.status).toBe(404);
	// console.log('error.data', error.data);
});
