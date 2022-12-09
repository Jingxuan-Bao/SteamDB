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

async function getGameInfo(req, res) {
    const gameid = req.params.app_id;
    if(gameid) {
        var query = `
        With games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id = '${gameid}'),
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

async function getGameReview(req, res) {
    const gameid = req.params.app_id;
    if(gameid) {
        var query = `
        SELECT R.app_name, R.review, R.language, R.recommended
        FROM REVIEW R
        WHERE R.app_id = '${gameid}'
	limit 50
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

async function gameRecommended(req, res) {
    const gameid = req.params.app_id;
    if(gameid) {
        var query = `
        SELECT distinct D.app_id,
                D.genre,
                D.short_description,
                D.positive_ratings,
                D.negative_ratings,
                F.figure,
                D.positive_ratings / (D.positive_ratings + D.negative_ratings) as positive_ratings_percentage
        FROM DESCRIPTION D
            join FIGURE F
            on F.app_id = D.app_id
        where D.genre like concat('%', (select genre from DESCRIPTION where app_id = '${gameid}'), '%')
        and D.average_playtime > (select average_playtime from DESCRIPTION where app_id = '${gameid}') - 100
        and D.average_playtime > (select average_playtime from DESCRIPTION where app_id = '${gameid}') + 100
        order by positive_ratings_percentage desc
        limit 10;
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

async function gameRecommendByUser(req, res) {
    const userid = req.params.userid;
    if(userid) {
        var query = `
        select distinct OG.app_id,
                D.genre,
                D.short_description,
                D.positive_ratings,
                D.negative_ratings,
                F.figure,
                D.positive_ratings / (D.positive_ratings + D.negative_ratings) as positive_ratings_percentage
        FROM OWN_GAME OG
         join DESCRIPTION D on OG.app_id = D.app_id
         join FIGURE F on F.app_id = OG.app_id
        where OG.user_id in
            (select most_matches_users.user_id
            from (SELECT OG.user_id
                FROM OWN_GAME OG
                JOIN (SELECT app_id
                    FROM OWN_GAME
                    WHERE user_id = '${userid}') G ON OG.app_id = G.app_id
             where user_id != '${userid}'
             group by OG.user_id
             order by count(1)
             limit 10) most_matches_users)
            and OG.app_id not in (SELECT app_id
                                FROM OWN_GAME
                                WHERE user_id = '${userid}')
        order by positive_ratings_percentage Desc
        limit 10;
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
        res.json({status: "no user id"});
    }
}

module.exports = (app) => {
    app.get('/game/:app_id', getGameInfo);
    app.get('/game/:userid/userrecommend', gameRecommendByUser);
    app.get('/game/:app_id/getGameReview', getGameReview);
    app.get('/game/:app_id/gamerecommend', gameRecommended);
}
    



