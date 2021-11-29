import socketEvents from "./events.js";

const startGame = function(socket) {
    const object = {};

    object.listen = function(fn) {
        socket.on(socketEvents.START_GAME, () => {
            fn();
        });
    }

    return object;
};

export default startGame;