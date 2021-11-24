import Utils from "../Util/util.js";
import nav from "./nav.js";
import cardView from "./cardView.js";

const DeckSetter = function(element) {
    const main_view = Utils.createAndInsert('div', 'deck-setter-main', element);

    const insertComponents = function() {
        const navObject = nav();
        const cardViewObject = cardView(navObject);

        navObject.cardView = cardViewObject.component;

        Utils.append(main_view, navObject.component, cardViewObject.component);
    };


    insertComponents();
};

export default DeckSetter;