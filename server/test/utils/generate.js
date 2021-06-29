import faker from 'faker';
const getId = faker.datatype.uuid;
const getDescription = faker.lorem.paragraph;

const buildRecipe = (overrides) => {
	return {
		name: faker.lorem.words(),
		description: faker.lorem.words(180),
		prepTime: faker.datatype.number(30),
		cookTime: faker.datatype.number(45),
		...overrides,
	};
};

const buildReq = ({ ...overrides } = {}) => {
	const req = { body: {}, params: {}, ...overrides };
	return req;
};

const buildRes = ({ ...overrides } = {}) => {
	const res = {
		json: jest.fn(() => res).mockName('json'),
		status: jest.fn(() => res).mockName('status'),
		...overrides,
	};
	return res;
};

const buildNext = (impl) => {
	return jest.fn(impl).mockName('next');
};

export {
	buildRecipe,
	buildReq,
	buildRes,
	buildNext,
	getId as id,
	getDescription as description,
};
