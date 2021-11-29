import Utils from "../Util/util.js";
import arena from "./arena.js";
import handCards from "./handCards.js";
import cardPlays from "./cardPlays.js";

const GameStart = function(main_component = document.getElementById('main_view')) {
    const object = {};

    // Dispose Deck Setter
    if (main_component.children[0]) {
        main_component.children[0].remove();
        localStorage.state = 2;
    }

    object.component = Utils.createAndInsert('canvas', 'game-start-view', main_component);
    object.component.width = main_component.clientWidth;
    object.component.height = main_component.clientHeight;
    
    object.ctx = object.component.getContext('2d');

    object.state = {
        MY_TURN: false,
        CHOOSING_CARD: true,
        MOVING: false,
        ATTACKING: false,
        HP: 8000,
        END_GAME: false
    };


    object.start = function() {
        object.ctx.beginPath();
        
        object.arena = arena(object);
        object.arena.start();
        
        object.handCards = handCards(object);
        object.handCards.start();

        object.cardPlays = cardPlays(object);

    };

    object.start();

    return object;
};

export default GameStart;