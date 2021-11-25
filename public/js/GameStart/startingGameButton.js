import Utils from "../Util/util.js";

const startingGameButton = function(navComponent) {
    const object = {};

    object.hide = function() {
        Utils.ocult(object.component);
    }

    object.show = function() {
        Utils.show(object.component);
    }

    object.start = function() {

    }
    
    object.component = Utils.createAndInsert('button', 'starting-game-btn', navComponent);
    Utils.insertText(object.component, 'Start Game');

    
    return object;
};

export default startingGameButton;