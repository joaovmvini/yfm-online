import Utils from "../Util/util.js";

const nav = function() {
    const element = Utils.createAndInsert('div', 'deck-setter-nav', null);
    const label = Utils.createAndInsert('span', 'deck-setter-label', element);

    label.textContent = 'Build Your Deck';
    
    const searchInput = Utils.createAndInsert('input', 'deck-setter-search', element);
    
    searchInput.type = 'text';
    searchInput.placeholder = 'Card Name'

    element.search = searchInput;

    return element;
};

export default nav();