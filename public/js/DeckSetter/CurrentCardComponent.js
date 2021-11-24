import Utils from "../Util/util.js";

const CurrentCardComponent = (function(parentComponent) {
    const object = {};

    object.component = Utils.createAndInsert('div', 'deck-setter-selected', null);
    object.component.item = parentComponent.children[0];

    object.sendCommand = function(keyCode) {
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
   
    const allItems = Array.from(parentComponent.children);

    const state = {
        deckStorage: [],
        currentIndex: 0
    };

    const getIndexByItem = function(item) {
        return allItems.indexOf(item);
    };

    const move = function(direction) {
       var reference = null;
       let component = object.component;

       if (direction > 0) {
           reference = component.item.nextElementSibling;
       } else {
           reference = component.item.previousElementSibling;
       }

       if (reference && ! Utils.isOcult(reference)) {
           component.item = reference;
           state.currentIndex = getIndexByItem(reference);
           Utils.append(reference, component);
       }
    };

    const getCard = function() {
        return allItems[state.currentIndex].card;
    };

    const saveDeck = function() {
        localStorage.deck = JSON.stringify(state.deckStorage);
    };

    const updateItemNumeration = function(item, num) {
        Utils.insertText(item.children[3], num + '/3');
    };

    const insertOrRemoveCard = function(inc) {
        
        const cardObject = state.deckStorage.find(o => o && o.index == state.currentIndex);

        if (! cardObject && inc > 0) {
            let cardObj = { index: state.currentIndex, card: getCard(), counter: 1 };
            state.deckStorage.push(cardObj);
            updateItemNumeration(object.component.item, cardObj.counter);
        }

        if ((cardObject && cardObject.counter < 3 && inc > 0) || (cardObject && cardObject.counter > 0 && inc < 0)) {
            cardObject.counter += inc;

            if (! cardObject.counter) {
                state.deckStorage.splice(state.deckStorage.indexOf(cardObject), 1);
            }
            updateItemNumeration(object.component.item, cardObject.counter);
        } 

        saveDeck();
    };

    const loadInitialState = function() {
        if (localStorage.deck) {
            const storedDeck = JSON.parse(localStorage.deck);

            if (storedDeck.length) {
                state.deckStorage = storedDeck;

                storedDeck.forEach(cardObj => {
                    updateItemNumeration(allItems[cardObj.index], cardObj.counter);
                });
            }
        }
    };
    
    loadInitialState();
    
    return object;
});


export default CurrentCardComponent;