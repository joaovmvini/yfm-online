import Utils from "../Util/util.js";
import GameStart from "./GameStart.js";

const startingGameButton = function(navComponent, socketHandler) {
    const object = {};

    object.hide = function() {
        Utils.ocult(object.component);
    }

    object.show = function() {
        Utils.show(object.component);
    }

    object.disposeAll = function() {
        GameStart();
    }

    object.start = function() {
        Utils.insertText(object.component, 'Waiting a player...');

        socketHandler.gameStart.listen(object.disposeAll);
        socketHandler.queue.start();
    }
    
    object.component = Utils.createAndInsert('button', 'starting-game-btn', navComponent);
    Utils.insertText(object.component, 'Start Game');

    // Main event
    object.component.addEventListener('click', function() {
        object.start();
    });
    
    return object;
};

export default startingGameButton;