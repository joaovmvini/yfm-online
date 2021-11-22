const express = require('express');
const app = express();

const path = require('path');
const Fs = require('fs');

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const publicDir = path.resolve('./public');

app.use(express.static(publicDir));
app.use(express.json());

// Routes

app.get('/getAllCards', (req, res) => {
    const cardList = Fs.readdirSync(path.resolve(publicDir, 'cards'));
    const paths = cardList.map(cardName => '/cards/' + cardName);
    return res.json({ cards: paths });
});


server.listen(3000, () => console.log('Listening on *:3000'));
