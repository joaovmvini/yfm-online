import socketEvents from "./events.js";

const queue = function(socket) {
    const object = {};

    object.start = function() {
        socket.emit(socketEvents.QUEUE_MATCH);
    };

    return object;
};

export default queue;