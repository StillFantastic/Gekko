const mysql = require("mysql");

module.exports = function *() {
	console.log("post data: ", this.request.body.keyword);
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "fu06ji3ul4",
		database: "bishijie"
	});

	let query = function(sql) {
		return new Promise((resolve, reject) => {
			con.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
				con.end(err => {
				});
			});
		});
	}
	
	let startDate = this.request.body.startDate;
	let endDate = this.request.body.endDate;
	let keyword = this.request.body.keyword;
	let sql = `SELECT * FROM kuaixun WHERE date >= '${startDate}' AND date <= '${endDate}' + INTERVAL 1 DAY AND content LIKE '%${keyword}%' ORDER BY date DESC;`;
	this.body = yield query(sql);
	/*
	await con.connect(function(err) {
		if (err) throw err;
		console.log("connected!");
		let sql = "SELECT * FROM kuaixun LIMIT 2;";
		con.query(sql, function(err, result) {
			if (err) throw err;
			console.log("sql result = ", result);
			this.body = result;
			con.end(function(err) {
				if (err) throw err;
				console.log("end successfully");
			});
		});
	});
	*/	
};
