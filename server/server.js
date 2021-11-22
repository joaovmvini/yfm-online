const express = require('express');
const app = express();

const path = require('path');
const Fs = require('fs');

const http = require('http');
const { Server } = require('socket.io');

const getCollection = require('../database/getCollection');

const server = http.createServer(app);
const io = new Server(server);

const publicDir = path.resolve('./public');

app.use(express.static(publicDir));
app.use(express.json());

// Routes

app.get('/getAllCards', async (req, res) => {
    const cardList = await getCollection();

    return res.json({ cards: cardList });
});


server.listen(3000, () => console.log('Listening on *:3000'));
