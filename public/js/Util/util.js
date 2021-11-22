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
    },
    insertText(el, text) {
        el.textContent = text;
    },
    changeY(el, speed) {
        el.style.top = (el.offsetTop + speed) + 'px';
    },
    changeX(el, speed) {
        el.style.left = (el.offsetLeft + speed) + 'px';
    }
}

export default Utils;