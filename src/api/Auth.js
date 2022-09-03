const axios = require("axios");

class Auth
{
    async Login(login, password)
    {
        return axios.post("http://localhost:3222/api/auth/login", {
            login,
            password
        })
        
    }

    async Register(login, password, email)
    {
        let res = axios.post("http://localhost:3222/api/auth/register", {
            login,
            password,
            email
        })

        return res;
    }

}

module.exports = new Auth();