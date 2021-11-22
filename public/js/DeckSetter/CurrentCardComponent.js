import Utils from "../Util/util.js";

const CurrentCardComponent = (function(cards, parentComponent) {
    const component = Utils.createAndInsert('div', 'deck-setter-selected', null);

    component.sendCommand = function(keyCode) {
        switch (keyCode) {
            case 38:
                move(-1);
                break;
            case 40:
                move(1);
                break;
            case 32:
                insertOrRemoveCard(1);
                break;
            case 88:
                insertOrRemoveCard(-1);
                break;
            default:
                break;
        }
    };
   
    const state = {
        currentIndex: 0,
        currentCard: cards[0],
        counter: []
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
    };

    const updateScrollBar = function(v) {
        parentComponent.scrollTop += v;
    };

    const updateAllCards = function(isStoredDeck = false) {
        if (state.counter.length) {
            state.counter.forEach(function (counterObject) {
                const counterElement = parentComponent.children[counterObject.index - Number(isStoredDeck)].lastElementChild;
                Utils.insertText(counterElement, counterObject.counter + '/3');

                if (! counterObject.counter) {
                    state.counter.splice(state.counter.indexOf(counterObject), 1);
                }
            });
        }
    }

    const insertOrRemoveCard = function(inc) {
        updateCardCounterState(inc);
        updateAllCards();
        storeCurrentDeck();
    };

    const storeCurrentDeck = function() {
        localStorage.deck = JSON.stringify(state.counter);
    };

    const updateCardCounterState = function(inc) {
        const currentIndex = state.currentIndex + 1;
        const counterObject = state.counter.find(o => o && o.index == currentIndex);
        const cardItem = parentComponent.children[currentIndex].card;
        const increase = inc > 0;

        if (! counterObject && ! increase) {
            return ;
        }

        if (counterObject && counterObject.counter < 1 && ! increase) {
            return ;
        }

        if (! counterObject && increase) {
            state.counter.push({ index: currentIndex, counter: 1, card:  cardItem });
        } else if (counterObject.counter < 3 || ! increase) {
            counterObject.counter += inc;
        }
    };

    
    const hasStoredDeck = function() {
        if (localStorage.deck) {
            state.counter = JSON.parse(localStorage.deck);
            return true;
        }
        return false;
    };

    const startEvents = function() {
        const isStoredDeck = hasStoredDeck();
        if (isStoredDeck) {
            updateAllCards(isStoredDeck);
        }
    };

    startEvents();

    return component;
});


export default CurrentCardComponent;