const connection = require("./server/connection");

const checkApp = (app_acronym) => {
	return new Promise((resolve, reject) => {
		const query = `SELECT app_acronym FROM application WHERE app_acronym = ?`;
		connection.query(query, [app_acronym], (error, result) => {
			if (error) reject(error);
			else if (result.length > 0) {
				return resolve(result);
			} else if (result.length < 1) {
				return resolve(false);
			}
		});
	});
};
module.exports = checkApp;
