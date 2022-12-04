import config from './config.json';

const getPassword = async (id) => {
    var headers = {};
    var res = await fetch(`http://${config.server}/login/${id}/getpassword`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    return res.json()
}

export {
    getPassword
}