const jwt = require('jsonwebtoken');

function restrict() {
	const authError = {
		message: 'shall not pass!'
	};
	return async (req, res, next) => {
		try {
			const token = req.cookies.token;

			if (!token) {
				return res.status(401).json(authError);
			}
			const secret = process.env.JWT_SECRET || 'Howdy';
			jwt.verify(token, secret, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError);
				}

				next();
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}

module.exports = restrict;
