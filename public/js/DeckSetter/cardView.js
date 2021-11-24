import Utils from "../Util/util.js";
import CurrentCardComponent from "./CurrentCardComponent.js";

const cardView = (function(navObject) {
    const object = {};

    object.component = Utils.createAndInsert('div', 'deck-setter-card-view', null);
    object.component.tabIndex = '0';

    const loadCards = async function() {
        const res = await fetch('/getAllCards')
        const data = await res.json();

        if (data && typeof data === 'object' && data.cards) {
            return data.cards;
        } else {
            window.location.reload();
        }
    }

    const setEvents = function(currentCardObject) {
        object.component.addEventListener('keydown', (event) => {
            event.preventDefault();
            currentCardObject.sendCommand(event.keyCode);
        });
    };

    loadCards().then(cards => {
        if (cards) {

            for (let i = 0; i < cards.length; i ++) {
                var item = Utils.createAndInsert('div', 'deck-setter-card-item', object.component);
                item.card = cards[i];
                
                var imageElement = Utils.createAndInsert('img', 'card-item-img', item);
                var cardName = Utils.createAndInsert('span', 'card-details', item);
                var cardAtkDef = Utils.createAndInsert('span', 'card-details', item);

                var selectionCounter = Utils.createAndInsert('div', 'deck-setter-card-counter', item);

                Utils.insertText(selectionCounter, '0/3');
                Utils.insertText(cardAtkDef, cards[i].atk + '/' + cards[i].def + ' (atk/def)');
                Utils.insertText(cardName, cards[i].name);

                imageElement.src = cards[i].image;
            }

            // Set selected card component
            const currentCardObject = CurrentCardComponent(object.component);

            Utils.append(object.component.children[0], currentCardObject.component);

            navObject.setEvents(currentCardObject);
            setEvents(currentCardObject);
        }
    });

    return object;
});

export default cardView;