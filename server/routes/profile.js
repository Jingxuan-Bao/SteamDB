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

function getowngame(req, res) {
    const userid = req.params.userid;
    if(userid) {
        var query = `
        SELECT name, genre, figure
        FROM OWN_GAME O
        JOIN GAME G on G.app_id = O.app_id
        JOIN DESCRIPTION D on G.app_id = D.app_id
        JOIN FIGURE F on G.app_id = F.app_id
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

function userrecommend(req, res) {
    const userid = req.params.userid;
    if(userid) {
        var query = `
        WITH GAMELIST AS
        (SELECT G.app_id
        FROM OWN_GAME O
        JOIN GAME G on G.app_id = O.app_id
        WHERE user_id = '${userid}'
        ),  CITY AS (
            SELECT location
            FROM USER R
            WHERE user_id = '${userid}'
        ),  FRIENDLIST AS (
            SELECT O.user_id
            FROM OWN_GAME O
            JOIN GAMELIST G ON O.app_id = G.app_id
        ),  SAMECITYFRIEND AS (
            SELECT DISTINCT F.user_id
            FROM FRIENDLIST F
            JOIN USER U ON U.user_id = F.user_id
            WHERE U.location IN (SELECT * FROM CITY)
        )
        (SELECT * FROM SAMECITYFRIEND);  
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

function gamerecommend(req, res) {
    const userid = req.params.userid;
    if(userid) {
        var query = `
        WITH GAMELIST AS
        (SELECT G.app_id
        FROM OWN_GAME O
        JOIN GAME G on G.app_id = O.app_id
        WHERE user_id = '${userid}'
        ),  GAMETYPE AS (
            SELECT genre
            FROM DESCRIPTION D
            JOIN GAMELIST G ON G.app_id = D.app_id
        ),  FRIENDLIST AS (
            SELECT O.user_id
            FROM OWN_GAME O
            JOIN GAMELIST G ON O.app_id = G.app_id
        ),  FRIENDGAMELIST AS (
            SELECT DISTINCT O.app_id
            FROM OWN_GAME O
            JOIN FRIENDLIST F ON O.user_id = F.user_id
        ),  TARGETNAMETYPE AS (
            SELECT app_id
            FROM DESCRIPTION
            WHERE genre IN (SELECT * FROM GAMETYPE)
        ),  SORTGAME AS (
            SELECT F.app_id
            FROM FRIENDGAMELIST F
            JOIN DESCRIPTION R ON F.app_id = R.app_id
            JOIN TARGETNAMETYPE T ON F.app_id = T.app_id
            WHERE positive_ratings > 10 * negative_ratings
            AND F.app_id NOT IN (SELECT * FROM GAMELIST)
            ORDER BY R.positive_ratings DESC
            LIMIT 10
        ),  FRIENDGAMEDES AS (
            SELECT name, genre, figure
            FROM SORTGAME O
            JOIN GAME G on G.app_id = O.app_id
            JOIN DESCRIPTION D on G.app_id = D.app_id
            JOIN FIGURE F on G.app_id = F.app_id
        )
        (SELECT * FROM FRIENDGAMEDES);  
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

//export module
module.exports = (app) => {
    app.get('/profile/:userid/owngame', getowngame);
    app.get('/profile/:userid/userrecommend', userrecommend);
    app.get('/profile/:userid/gamerecommend', gamerecommend);
}