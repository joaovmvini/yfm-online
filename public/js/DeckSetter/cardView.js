import Utils from "../Util/util.js";
import CurrentCardComponent from "./CurrentCardComponent.js";

const cardView = (function() {
    const element = Utils.createAndInsert('div', 'deck-setter-card-view', null);
    element.tabIndex = '0';

    const loadCards = async function() {
        const res = await fetch('/getAllCards')
        const data = await res.json();

        if (data && typeof data === 'object' && data.cards) {
            return data.cards;
        } else {
            window.location.reload();
        }
    }

    const setEvents = function(currentCard) {
        element.addEventListener('keydown', (event) => {
            event.preventDefault();
            currentCard.sendCommand(event.keyCode);
        });
    };

    loadCards().then(cards => {
        if (cards) {

            for (let i = 0; i < cards.length; i ++) {
                var item = Utils.createAndInsert('div', 'deck-setter-card-item', element);
                var imageElement = Utils.createAndInsert('img', 'card-item-img', item);
                var cardName = Utils.createAndInsert('span', 'card-details', item);
                var cardAtkDef = Utils.createAndInsert('span', 'card-details', item);

                Utils.insertText(cardAtkDef, cards[i].atk + '/' + cards[i].def + ' (atk/def)');
                Utils.insertText(cardName, cards[i].name);

                imageElement.src = cards[i].image;
            }

            // Set selected card component
            const currentCard = CurrentCardComponent(cards, element);
            element.insertBefore(currentCard, element.children[0]);

            setEvents(currentCard);
        }
    });

    return element;
})();

export default cardView;