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

export {
    getPassword,
    gameSearch,
    tenrandomgame
}