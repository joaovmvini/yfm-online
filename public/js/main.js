import DeckSetter from "./DeckSetter/DeckSetter.js";
import GameStart from "./GameStart/GameStart.js";
import StartSocketCommunication from "./socket.io/main.js";

(function main() {

    const main_view = document.getElementById('main_view');

    const states = {
        1: DeckSetter, 
        2: GameStart
    };

    const getOrSetState = function() {
        if (! localStorage.state) {
            localStorage.state = 1;
        }
        return localStorage.state;
    }

    const state = getOrSetState();

    const start = (function () {
        const socketHandler = StartSocketCommunication();
        
        if (states[state]) {
            states[state](main_view, socketHandler);
        }
    });

    start();

})();