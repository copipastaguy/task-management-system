const connection = require("../server/connection");
const bcrypt = require("bcrypt");


const loginUser = (username, password) => {
	return new Promise((resolve, reject) => {
		// QUERY STATEMENT
		const query = `SELECT username, password, status, user_group FROM accounts WHERE username = ? `;
		connection.query(query, [username], (error, result) => {
			if (error) reject(error);
			// - - - VALID - - -
			else if (result.length > 0) {
				const userInfo = result[0];
				const hashPassword = result[0].password;
				const status = result[0].status;

				if (status == "Inactive") {
					return resolve(false);
				} else if (status === "Active") {
					bcrypt.compare(password, hashPassword, (error, correctPassword) => {
						if (error) throw error;
						else if (correctPassword) {
							return resolve(userInfo);
						} else {
							return resolve(false);
						}
					});
				}
			} else {
				// - - - INVALID USER - - -
				return resolve(false);
			}
		});
	});
};
module.exports = loginUser;
