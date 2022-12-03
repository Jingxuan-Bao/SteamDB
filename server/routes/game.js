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

async function getGameByGenre(req, res) {
    const gameid = req.params.app_id;
    if(gameid) {
        var query = `
        With games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id = '${gameid}'
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM games)),
        game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE app_id IN (SELECT app_id FROM games))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
        short_description, release_dt, language, platform, developer, genre, positive_ratings,
        negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id;
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

async function getGameByGenre(req, res) {
    const gameid = req.params.app_id;
    if(gameid) {
        var query = `
        SELECT R.app_name, R.review, R.language, R.recommended
        FROM REVIEW R
        WHERE R.app_id = '${gameid}'
        `
    ;
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
    



