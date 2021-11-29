const express = require('express');
const app = express();

const path = require('path');
const Fs = require('fs');

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const startRoutes = require('./routes');
const startSocketCommunication = require('./communication/main');

const publicDir = path.resolve('./public');

app.use(express.static(publicDir));
app.use(express.json());

startRoutes(app);
startSocketCommunication(io)

server.listen(3000, () => console.log('Listening on *:3000'));
