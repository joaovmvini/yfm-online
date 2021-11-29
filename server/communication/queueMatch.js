const events = require("./events");

const matches = [];

const checkForMatch = function(battle) {
    if (matches.length === 2) {
        const [player1, player2] = matches;

        battle.matches.push({ player1, player2 });
        matches.length = 0;
        
        return true;
    }
};

const queueMatch = function() {
    const { io, socket } = this;

    if (! matches.includes(socket.id)) {
        matches.push(socket.id);
    }

    if (checkForMatch(this.battle)) {
        io.emit('START_GAME');
    }
};

module.exports = queueMatch;