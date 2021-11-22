const Utils = {
    createAndInsert(tagName, className = '', parent = null) {
        const el = document.createElement(tagName);
        
        if (className) {
            el.className = className;
        }

        if (parent) {
            parent.appendChild(el);
        }
        
        return el;
    }
}

export default Utils;