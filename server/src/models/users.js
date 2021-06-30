import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsersSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	salt: String,
	hash: String,
});

const Users = mongoose.model('users', UsersSchema);

export { Users };
