import Utils from "../Util/util.js";

const nav = function() {
    const object = {};

    object.component = Utils.createAndInsert('div', 'deck-setter-nav', null);

    const label = Utils.createAndInsert('span', 'deck-setter-label', object.component);

    label.textContent = 'Build Your Deck';
    
    const searchInput = Utils.createAndInsert('input', 'deck-setter-search', object.component);
    
    searchInput.type = 'text';
    searchInput.placeholder = 'Card Name'

    object.setEvents = function(cardSelectingObject) {
        let cardSelecting = cardSelectingObject.component;
        let cardView = object.cardView;
        let items = Array.from(cardView.children);

        searchInput.onkeyup = function(event) {
            items.forEach(item => {
                const noMatch = item.children[1] && ! item.children[1].textContent.toLowerCase().includes(searchInput.value.toLowerCase());
                
                if (noMatch) {
                    Utils.ocult(item);
                }

                if (! noMatch && Utils.isOcult(item)) {
                    Utils.show(item);
                }
            });

            const firstItem = items.find(item => item.children[1] && (! Utils.isOcult(item)));
            
            cardSelecting.item = firstItem;
            Utils.append(firstItem, cardSelecting);
        }
    }

    return object;
};

export default nav;