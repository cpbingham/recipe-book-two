const getData = (res) => res.data;
const handleRequestFailure = ({ response: { status, data } }) => {
	const error = new Error(`${status}: ${JSON.stringify(data)}`);
	error.stack = error.stack
		.split('\n')
		.filter(
			(line) =>
				!line.includes('at handleRequestFailure') &&
				!line.includes('at processTicksAndRejections'),
		)
		.join('\n');
	error.status = status;
	error.data = data;
	return Promise.reject(error);
};

const resolve = (e) => e;

export { getData, handleRequestFailure, resolve };
