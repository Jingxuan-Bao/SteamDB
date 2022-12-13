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
        CREATE INDEX user_id
        ON OWN_GAME (user_id);
        CREATE INDEX app_id
        ON OWN_GAME (app_id);
        WITH GAMELIST AS
        (SELECT G.app_id
        FROM OWN_GAME O
        JOIN GAME G on G.app_id = O.app_id
        WHERE user_id = '${userid}'
        ),  FRIENDLIST AS (
            SELECT O.user_id, COUNT(G.app_id) AS game_num
            FROM OWN_GAME O
            JOIN GAMELIST G
            GROUP BY O.user_id
            HAVING O.user_id <> '${userid}'
            ORDER BY game_num desc
            LIMIT 10
        ),  FRIENDGAMELIST AS (
            SELECT app_id
            FROM OWN_GAME O
            JOIN FRIENDLIST F ON F.user_id = O.user_id
        ),  FRIENDLIST2 AS (
            SELECT O.user_id, COUNT(G.app_id) AS game_num
            FROM OWN_GAME O
            JOIN FRIENDGAMELIST G ON O.app_id = G.app_id
            GROUP BY O.user_id
            HAVING O.user_id NOT IN (SELECT user_id FROM FRIENDLIST)
            AND O.user_id <> '${userid}'
            ORDER BY game_num desc
            LIMIT 10
        ),  UNIONFRIEND AS (
            SELECT user_id
            FROM FRIENDLIST
            UNION
            SELECT user_id
            FROM FRIENDLIST2
        ),  FRIENDOWNGAME AS (
            SELECT O.user_id, O.app_id
            FROM UNIONFRIEND F
            JOIN OWN_GAME O ON F.user_id = O.user_id
        ),  FRIENDRANK AS (
            SELECT G.user_id, COUNT(G.app_id) AS game_num
            FROM GAMELIST O
            JOIN FRIENDOWNGAME G ON O.app_id = G.app_id
            GROUP BY G.user_id
            HAVING G.user_id <> '${userid}'
            ORDER BY game_num desc
            LIMIT 10
        )
        (SELECT user_id FROM FRIENDRANK);
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