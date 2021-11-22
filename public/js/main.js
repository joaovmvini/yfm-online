import DeckSetter from "./DeckSetter/DeckSetter.js";

(function main() {

    const main_view = document.getElementById('main_view');

    const states = {
        1: DeckSetter, 
        2: 'Game'
    };

    const getOrSetState = function() {
        if (! localStorage.state) {
            localStorage.state = 1;
        }
        return localStorage.state;
    }

    const state = getOrSetState();

    const start = (function () {
        if (states[state]) {
            states[state](main_view);
        }
    });

    start();

})();