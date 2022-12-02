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

// get game by name
function getGameByname(req, res) {
    const gamename = req.params.gamename;
    if(gamename) {
        var query = `
        With games AS(
            SELECT app_id, name
            FROM GAME
            WHERE name = '${gamename}'),
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
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no such game name"});
    }
}


// return random 10 games in mainpage
async function mainpage(req, res) {
    var query = `
    With games AS(
        SELECT app_id, name
        FROM GAME
        ORDER BY RAND()
        LIMIT 10),
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
    connection.query(query
        , function(error, results, fields) {
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

async function getGameByGenre(req, res) {
    const genre = req.params.genre;
    if(genre) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE genre like '%${genre}%'),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM game_description)),
        games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id IN (SELECT app_id FROM game_description))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
        short_description, release_dt, language, platform, developer, genre, positive_ratings,
        negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id;
        `;
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no such genre"});
    }
}

// search game by launguage
async function getGameByLanguage(req, res) {
    const language = req.params.language;
    if(language) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE language = '${language}'),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM game_description)),
        games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id IN (SELECT app_id FROM game_description))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
        short_description, release_dt, language, platform, developer, genre, positive_ratings,
        negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id;
        `;
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no such language"});
    }
}

// search game that release_dt is after a certain date
async function getGameByReleaseDate(req, res) {
    const date = req.params.date;
    if(date) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE release_dt > '${date}'),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM game_description)),
        games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id IN (SELECT app_id FROM game_description))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,short_description, release_dt, language, platform, developer, genre, positive_ratings,negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id;
        `;
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no games found after given date"});
    }
}

// search games by genre, language, release_dt
async function getGameByGenreLanguageReleaseDate(req, res) {
    const genre = req.params.genre;
    const language = req.params.language;
    const date = req.params.date;
    if(genre && language && date) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE genre like '%${genre}%' AND language = '${language}' AND release_dt > '${date}'),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM game_description)),
        games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id IN (SELECT app_id FROM game_description))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
        short_description, release_dt, language, platform, developer, genre, positive_ratings,
        negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id;
        `;
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no such genre, language, or date"});
    }
}

// search games sorted by positive_ratings
async function getGameByPositiveRatings(req, res) {
    var query = `
    With game_description AS(
        SELECT *
        FROM DESCRIPTION
        ORDER BY positive_ratings DESC
        LIMIT 50),
    game_picture AS(
        SELECT app_id, figure, background
        FROM FIGURE
        WHERE app_id IN (SELECT app_id FROM game_description)),
    games AS(
        SELECT app_id, name
        FROM GAME
        WHERE app_id IN (SELECT app_id FROM game_description))
    SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
    short_description, release_dt, language, platform, developer, genre, positive_ratings,
    negative_ratings, price, average_playtime
    FROM games, game_picture, game_description
    WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id
    ORDER BY positive_ratings DESC;
    `;
    connection.query(query
        , function(error, results, fields) {
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

// get top 50 games by genre, language, release_dt and sort by positive_ratings
async function getGameByGenreLanguageReleaseDatePositiveRatings(req, res) {
    const genre = req.query.genre;
    const lan = req.query.lan;
    const dt = req.query.dt;
    console.log(genre, lan, dt)
    if(genre && lan && dt) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE genre like '%${genre}%' AND language = '${lan}' AND release_dt > '${dt}'
            ORDER BY positive_ratings DESC
            LIMIT 50),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM game_description)),
        games AS(
            SELECT app_id, name
            FROM GAME
            WHERE app_id IN (SELECT app_id FROM game_description))
        SELECT games.app_id, games.name, game_picture.figure, game_picture.background,
        short_description, release_dt, language, platform, developer, genre, positive_ratings,
        negative_ratings, price, average_playtime
        FROM games, game_picture, game_description
        WHERE games.app_id = game_picture.app_id AND games.app_id = game_description.app_id
        ORDER BY positive_ratings DESC;
        `;
        connection.query(query
            , function(error, results, fields) {
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
        res.json({status: "no valid input"});
    }
}








//export module
module.exports = (app) => {
    app.get('/mainpage', mainpage);
    app.get('/mainpage/name/:gamename', getGameByname);
    app.get('/mainpage/date/:date', getGameByReleaseDate);
    app.get('/mainpage/pos_rating/:positive_ratings', getGameByPositiveRatings);
    app.get('/mainpage/lan/:language', getGameByLanguage);
    app.get('/mainpage/genre/:genre', getGameByGenre);
    app.get('/mainpage/allsort/', getGameByGenreLanguageReleaseDatePositiveRatings);

}