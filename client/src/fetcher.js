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

export {
    getPassword,
    getGameInfo,
    getGameRecommended,
    getGameReview
}