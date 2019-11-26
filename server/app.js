const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const redis = require('redis');
const server = http.createServer(app);
const io = socket(server);
const client = redis.createClient();

const PORT = 3000;

let users = [],
    messages = [];

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

io.on('connection', socket => {
    const subscribe = redis.createClient();
    subscribe.subscribe('pubsub');

    subscribe.on('message', (channel, message) => {
        socket.send(message)
    });

    socket.on('join', msg => {
        const userData = JSON.parse(msg);
        if (hasId(users, userData.id)) return;
        users.push(userData);
        const data = {
            userData,
            users
        };
        client.publish('pubsub', JSON.stringify({
            type: 'user',
            msg: data
        }));
    });

    socket.on('message', msg => {
        const data = JSON.parse(msg);
        messages.push(data);
        client.publish('pubsub', JSON.stringify({
            type: 'message',
            msg: data
        }))
    });

    socket.on('changeUsername', msg => {
        client.publish('pubsub', JSON.stringify({
            type: 'changeName',
            msg: msg
        }))
    });

    socket.on('leave', msg => {
        const userData = JSON.parse(msg);
        users = users.filter(user => user.id !== userData['id']);
        const data = {
            userData,
            users
        };
        client.publish('pubsub', JSON.stringify({
            type: 'leave',
            msg: data
        }))
    })
});

function hasId(array, id){
    for (let i = 0; i < array.length; i++){
        if (array[i].id === id){
            return true;
        }
    }
    return false;
}