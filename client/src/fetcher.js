import config from './config.json';

const getPassword = async (id) => {
    var res = await fetch(`http://${config.server}/login/${id}/getpassword`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const gameSearch = async(gamename) => {
    var res = await fetch(`http://${config.server}/mainpage/name/${gamename}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const tenrandomgame = async() => {
    var res = await fetch(`http://${config.server}/mainpage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const topratinggame = async() => {
    var res = await fetch(`http://${config.server}/mainpage/pos_rating/12345`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const topreviewgame = async() => {
    var res = await fetch(`http://${config.server}/mainpage/review_count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const topgamebygenre = async(genre) => {
    var res = await fetch(`http://${config.server}/mainpage/gsort/${genre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}


const getGameInfo = async id => {
    var res = await fetch(`http://${config.server}/game/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const getGameRecommended = async id => {
    var res = await fetch(`http://${config.server}/game/${id}/gamerecommend`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const getGameReview = async id => {
    var res = await fetch(`http://${config.server}/game/${id}/getGameReview`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const getowngame = async id => {
    var res = await fetch(`http://${config.server}/profile/${id}/owngame`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const userrecommend = async id => {
    var res = await fetch(`http://${config.server}/profile/${id}/userrecommend`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

const gamerecommend = async id => {
    var res = await fetch(`http://${config.server}/profile/${id}/gamerecommend`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}



export {
    getPassword,
    gameSearch,
    tenrandomgame,
    topratinggame,
    topreviewgame,
    topgamebygenre,
    getGameInfo,
    getGameRecommended,
    getGameReview,
    getowngame,
    userrecommend,
    gamerecommend
}
