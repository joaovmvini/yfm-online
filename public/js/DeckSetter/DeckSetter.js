import Utils from "../Util/util.js";
import nav from "./nav.js";
import cardView from "./cardView.js";

const DeckSetter = function(element, socketHandler) {
    const main_view = Utils.createAndInsert('div', 'deck-setter-main', element);
    
    main_view.dispose = function() {
        main_view.remove();
    }

    const insertComponents = function() {
        const navObject = nav();
        const cardViewObject = cardView(navObject, socketHandler);

        navObject.cardView = cardViewObject.component;

        Utils.append(main_view, navObject.component, cardViewObject.component);
    };


    insertComponents();
};

export default DeckSetter;