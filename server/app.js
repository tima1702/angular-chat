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
});