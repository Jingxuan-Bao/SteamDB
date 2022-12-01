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

function getdescriptionbyId(req, res) {
    const appid = req.params.appid;
    if(appid) {
        var query = `
           SELECT short_description
           FROM DESCRIPTION
           WHERE app_id = '${appid}';        
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
        res.json({status: "no game id"});
    }
}

//export module
module.exports = (app) => {
    app.get('/description/:appid', getdescriptionbyId);
}