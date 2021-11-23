import Utils from "../Util/util.js";

const nav = function(cardView) {
    const element = Utils.createAndInsert('div', 'deck-setter-nav', null);
    const label = Utils.createAndInsert('span', 'deck-setter-label', element);

    label.textContent = 'Build Your Deck';
    
    const searchInput = Utils.createAndInsert('input', 'deck-setter-search', element);
    
    searchInput.type = 'text';
    searchInput.placeholder = 'Card Name'

    const setEvents = function() {
        let items = Array.from(cardView.children);

        searchInput.onkeyup = function(event) {
            if (! items.length) {
                items = Array.from(cardView.children);
                return ;
            }
            items.forEach(item => {
                const noMatch = item.children[1] && ! item.children[1].textContent.toLowerCase().includes(searchInput.value.toLowerCase());
                
                if (noMatch) {
                    Utils.ocult(item);
                } 
                if (! noMatch && Utils.isOcult(item)) {
                    Utils.show(item);
                }
            });
        }
    }

    setEvents();

    return element;
};

export default nav;