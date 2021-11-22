import Utils from "../Util/util.js";

const CurrentCardComponent = (function(cards, parentComponent) {
    const component = Utils.createAndInsert('div', 'deck-setter-selected', null);

    component.sendCommand = function(keyCode) {
        return keyCode == 38 ? move(-1) : keyCode == 40 ? move(1) : '';
    };
    
    const state = {
        currentIndex: 0,
        currentCard: cards[0],
    };

    const move = function(direction) {
        if (cards[state.currentIndex + direction]) {
            let yVariation = 75 * direction;
            Utils.changeY(component, yVariation);
            state.currentIndex += direction;
    
            updateCurrentCard();
            updateScrollBar(yVariation);
        }
    };

    const updateCurrentCard = function() {
        state.currentCard = cards[state.currentIndex];
        console.log(state.currentCard)
    };

    const updateScrollBar = function(v) {
        parentComponent.scrollTop += v;

    };

    return component;
});


export default CurrentCardComponent;