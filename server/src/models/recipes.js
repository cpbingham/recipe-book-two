import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipesSchema = new Schema({
	name: String,
	description: String,
	prepTime: Number,
	cookTime: Number,
	date: { type: Date, default: Date.now },
});

const Recipes = mongoose.model('recipe', RecipesSchema);

export { Recipes };
