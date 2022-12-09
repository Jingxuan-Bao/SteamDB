const config = require('../config.json')
const mysql = require('mysql');

//connect databse
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

function getpassword(req, res) {
    const userid = req.params.userid;
    if(userid) {
        var query = `
        SELECT password
        FROM USER
        WHERE user_id = '${userid}'    
       `;
       connection.query(query, function(error, results, fields) {
            if(error) {
                console.log(error);
                res.json({status: error});
            }
            else if(results) {
                res.json({
                    status: "success",
                    results: results
                })
            }
        })
    }
    else {
        res.json({status: "no user id"});
    }
}
module.exports = (app) => {
    app.get('/login/:userid/getpassword', getpassword);
}