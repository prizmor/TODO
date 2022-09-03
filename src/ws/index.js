const {io} = require("socket.io-client");

const URL = "ws://localhost:3222";
const socket = io(URL, { autoConnect: false });

class WS
{
    connect = (token) => {
        socket.auth = {username: token};
        socket.connect();
    }
}

module.exports = new WS();