const ctrlWrapper = (ctrlFunc) => {
	const func = async (req, res, next) => {
		try {
			await ctrlFunc(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

module.exports = ctrlWrapper;
