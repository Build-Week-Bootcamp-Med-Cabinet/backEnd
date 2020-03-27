const router = require('express').Router();
const Users = require('./userModel');

router.get('/', async (req, res, next) => {
	try {
		const users = await Users.getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/:username', async (req, res, next) => {
	try {
		const username = req.params.username;
		const user = await Users.getUserByUserName(username);

		// console.log('req.params:', req.params);
		// console.log('req.params.username:', req.params.username);
		// console.log('user:', user);

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

router.put('/:username', async (req, res, next) => {
	try {
		const changes = req.body;
		const username = req.params.username;
		const updateUser = await Users.updateUser(changes, username);

		res.status(201).json(updateUser);
	} catch (err) {
		next(err);
	}
});

router.delete('/:username', async (req, res, next) => {
	try {
		const deletedUser = await Users.removeUser(req.params.username);
		res.status(200).json({ message: 'User has been removed' });
	} catch (err) {
		next(err);
	}
});
module.exports = router;
