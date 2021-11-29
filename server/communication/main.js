const events = require('./events');

const startSocketCommunication = function(io) {
    const eventNames = Object.keys(events);

    io.on('connection', (socket) => {
        const o = { io, socket, battle: { matches: [] } };

        for (let i = 0; i < eventNames.length; i ++) {
            const eventFn = events[eventNames[i]].bind(o);

            socket.on(eventNames[i], eventFn);
        }
    });
};

module.exports = startSocketCommunication;