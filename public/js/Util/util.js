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
    },
    append(parent, ...childrens) {
        for (let i = 0; i < childrens.length; i ++) {
            parent.appendChild(childrens[i]);
        }
    },
    ocult(element) {
        element.style.display = 'none';
    },
    show(element) {
        element.style.display = '';
    },
    isOcult(element) {
        return element.style.display == 'none';
    },
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
    updateElementXY(object, x, y, w, h, img = false) {
        object.x = x;
        object.y = y;
        object.w = w;
        object.h = h;

        if (img) {
            object.img = img;
        }
    },
    isResultBetween(referenceValue) {
        const [min, max] = [0.9, 1];

        return (referenceValue >= min && referenceValue <= max);
    }
}

export default Utils;