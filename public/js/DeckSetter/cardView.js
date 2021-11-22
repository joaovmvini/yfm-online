import Utils from "../Util/util.js";

const cardView = (function() {
    const element = Utils.createAndInsert('div', 'deck-setter-card-view', null);

    const loadCards = async function() {
        const res = await fetch('/getAllCards')
        const data = await res.json();

        if (data && typeof data === 'object' && data.cards) {
            return data.cards;
        } else {
            window.location.reload();
        }
    }

    loadCards().then(cards => {
        if (cards) {
            for (let i = 0; i < cards.length; i ++) {
                
            }
        }
    });

    return element;
})();

export default cardView;