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
        res.json({status: "at least genre is required"});
    }
}

// get all genre
async function getAllGenres(req, res) {
    var query = `
    SELECT DISTINCT genre
    FROM DESCRIPTION;
    `;
    connection.query(query
        , function(error, results, fields) {
        if(error) {
            console.log(error);
            res.json({status: error});
        }
        else if(results) {
            console.log(results)
            for (let i = 0; i < results.length; i++) {
                results[i].genre = results[i].genre.split(';');
            }
            hashset = new Set();
            for (let i = 0; i < results.length; i++) {
                for (let j = 0; j < results[i].genre.length; j++) {
                    hashset.add(results[i].genre[j]);
                }
            }

            results = JSON.stringify(Array.from(hashset));

            res.json({
                status: "success",
                results: results
            })
        }
    })
}


// sort games by the amount of reviews
async function getGameByReviewsCount(req, res) {
    var query = `
    With game_review_count as(
        SELECT GAME.app_id, name, count(DISTINCT review_id) as review_count
        FROM GAME, REVIEW
        WHERE GAME.app_id = REVIEW.app_id
        GROUP BY app_id
        ORDER BY review_count DESC
        LIMIT 50),
    game_description AS(
        SELECT *
        FROM DESCRIPTION
        WHERE app_id IN (SELECT app_id FROM game_review_count)),
    game_picture AS(
        SELECT app_id, figure, background
        FROM FIGURE
        WHERE app_id IN (SELECT app_id FROM game_review_count))
    SELECT game_review_count.app_id, game_review_count.name, game_review_count.review_count,
    game_picture.figure, game_picture.background, short_description, release_dt, language,
    platform, developer, genre, positive_ratings, negative_ratings, price, average_playtime
    FROM game_review_count, game_picture, game_description
    WHERE game_review_count.app_id = game_picture.app_id AND game_review_count.app_id = game_description.app_id
    ORDER BY review_count DESC;
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


// get a game genre, sort by rating and review_count
async function getGameByGenreRatingReviewCount(req, res) {
    const genre = req.params.genre;
    if(genre) {
        var query = `
        With game_description AS(
            SELECT *
            FROM DESCRIPTION
            WHERE genre like '%${genre}%'),
        game_review_count as(
            SELECT GAME.app_id, name, count(DISTINCT review_id) as review_count
            FROM GAME, REVIEW
            WHERE GAME.app_id = REVIEW.app_id AND GAME.app_id IN (SELECT app_id FROM game_description)
            GROUP BY app_id),
        top_games AS(
            SELECT game_description.app_id, name, short_description, release_dt, language,
            platform, developer, genre, positive_ratings, negative_ratings, price, average_playtime, review_count
            FROM game_description, game_review_count
            WHERE game_description.app_id = game_review_count.app_id
            ORDER BY positive_ratings DESC, review_count DESC
            LIMIT 50),
        game_picture AS(
            SELECT app_id, figure, background
            FROM FIGURE
            WHERE app_id IN (SELECT app_id FROM top_games))
        SELECT top_games.app_id, top_games.name, game_picture.figure, game_picture.background,
        top_games.short_description, top_games.release_dt, top_games.language, top_games.platform,
        top_games.developer, top_games.genre, top_games.positive_ratings, top_games.negative_ratings,
        top_games.price, top_games.average_playtime, top_games.review_count
        FROM top_games, game_picture
        WHERE top_games.app_id = game_picture.app_id
        ORDER BY positive_ratings DESC, review_count DESC;
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
        res.json({status: "genre is required"});
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
    app.get('/allgenres', getAllGenres);
    app.get('/mainpage/review_count', getGameByReviewsCount);
    app.get('/mainpage/gsort/:genre', getGameByGenreRatingReviewCount);
}