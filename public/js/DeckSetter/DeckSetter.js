import Utils from "../Util/util.js";
import nav from "./nav.js";
import cardView from "./cardView.js";

const DeckSetter = function(element) {
    const main_view = Utils.createAndInsert('div', 'deck-setter-main', element);

    const insertComponents = function() {
        main_view.appendChild(nav);
        main_view.appendChild(cardView);
    };


    insertComponents();
};

export default DeckSetter;