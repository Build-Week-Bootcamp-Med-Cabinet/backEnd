const db = require('../database/dbconfig');

module.exports = {
	getAllUsers,
	getUserByUserName,
	addUser,
	updateUser,
	removeUser
};

//Get All Users
function getAllUsers() {
	return db('users as u').select(
		'u.firstname as FirstName',
		'u.lastName as LastName',
		'u.email as Email',
		'u.username as username'
	);
}

//Get user by username
function getUserByUserName(username) {
	return db('users as u')
		.where('u.username', username)
		.select('u.firstname as FirstName', 'u.lastName as LastName', 'u.email as Email')
		.first();
}
function addUser(user) {
	return db('projects').insert(user).then((id) => {
		return getUserByUserName(id[0]);
	});
}

function updateUser(changes, username) {
	return db('users as u').update(changes).where('u.username', username);
}

function removeUser(username) {
	return db('users as u').where('u.username', username).del();
}
