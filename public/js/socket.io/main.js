import queue from "./queue.js";
import startGame from "./startGame.js";

const StartSocketCommunication = function() {
    const object = {};
    const socket = object.socket = io();
    
    object.queue = queue(socket);
    object.gameStart = startGame(socket);

    return object;
};

export default StartSocketCommunication;