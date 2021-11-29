import Utils from "../Util/util.js";

const handCards = function(gameObject) {
    const [canvas, ctx] = [gameObject.component, gameObject.ctx];

    const object = {};

    const state = object.state = {
        deck: [],
        inHandCards: [],
        maxCards: 5,
        cursorIndex: 0,
        selectedCards: [],
    }

    const cardState = object.cardState = {
        width: 110,
        height: 120,
        speed: 7,
    }

    const cursorState = object.cursorState = {
        moved: false,
        direction: -1,
        currentCard: null,
        x: 0,
        y: 0,
        w: 20,
        h: 20,
        img: null,
        disposed: false
    };

    object.redrawAll = function() {
        if (state.inHandCards.length) {
            state.inHandCards.forEach(card => {
                ctx.clearRect(card.x, card.y, card.w, card.h);
                ctx.drawImage(card.img, card.x, card.y, card.w, card.h);
            });
        }
    };

    object.disposeCursor = function() {
        ctx.clearRect(cursorState.x, cursorState.y, cursorState.w, cursorState.h);
        cursorState.disposed = true;
    };

    const setupDeck = function() {
        const deckInfo = JSON.parse(localStorage.deck);

        deckInfo.forEach(d => {
            for (let i = 0; i < d.counter; i ++) 
                state.deck.push(Object.assign({}, d.card));
        });

        Utils.shuffleArray(state.deck);
    }

    const pullCards = function() {
        const neededCards = state.maxCards - state.inHandCards.length;

        let animate = function(margin, x, y, card, startSelector = false) {
            let image = new Image();
            image.src = card.image;

            requestAnimationFrame(function loop() {
                ctx.clearRect(x + cardState.speed, y, cardState.width, cardState.height);
                ctx.drawImage(image, x, y, cardState.width, cardState.height);

                if (x >= 50 + margin) {
                    x -= cardState.speed;
                } else {
                    if (startSelector) {
                        insertCursor();
                        cardChoosingEvents();
                    }
                    return null;
                }

                Utils.updateElementXY(card, x, y, cardState.width, cardState.height, image)

                requestAnimationFrame(loop);
            });
        }

        let [x, y] = [0, 0];
        let card = null;

        for (let i = 0; i < neededCards; i ++) {
            card = state.deck.pop();
            [x, y] = [canvas.width + ((1 + i) * cardState.width + (i * 15)), canvas.height - cardState.height - 5];
            state.inHandCards.push(card);

            animate(cardState.width * i + (i * 15), x, y, card, i == neededCards - 1 ? true : false);
        }        
    };

    const insertCursor = function() {
        let speed = .3;
        let img = new Image();
        img.src = '/img/arrowDown.png';

        img.onload = function() {
            let pickedCard = state.inHandCards[state.cursorIndex];

            cursorState.currentCard = pickedCard;

            let [xC, yC] = [pickedCard.x, pickedCard.y];
            let [x, y] = [xC + (cardState.width / 2) - 10, yC - 32.5];
            let yLimit = y - 15;
            let yInitial = y;
            let dy = -1;

            ctx.drawImage(img, x, y, cursorState.w, cursorState.w);

            const animate = function() {
                requestAnimationFrame(function loop() {                    
                    if (! cursorState.disposed) {
                        ctx.clearRect(x, y - speed * dy, cursorState.w, cursorState.w);
                        ctx.drawImage(img, x, y, cursorState.w, cursorState.w);
    
                        Utils.updateElementXY(cursorState, x, y, cursorState.w, cursorState.h, img);
    
                        if (y <= yLimit && dy < 0) {
                            dy *= -1;
                        } 
                        
                        if (y >= yInitial && dy > 0) {
                            dy *= -1;
                        }
    
                        y += speed * dy;
    
                        if (cursorState.moved) {
                            ctx.clearRect(x, y, cursorState.w, cursorState.w);
                            cursorState.moved = false;
                            return insertCursor(cursorState.direction);
                        }
                        
                        requestAnimationFrame(loop);
                    } else {
                        return null;
                    }
                });
            }

            animate();

        };
    };

    const selectCard = function() {
        if (! state.selectedCards.includes(cursorState.currentCard)) {
            state.selectedCards.push(cursorState.currentCard);

            const animate = function() {
                let { x, y, w, h, img } = cursorState.currentCard;
                const speed = 2;
                const yLimit = y - 6;

                requestAnimationFrame(function loop() {
                    ctx.clearRect(x, y + speed, w, h);
                    ctx.drawImage(img, x, y, w, h);
                    
                    if (y >= yLimit) {
                        y -= speed;
                    } else {
                        return null;
                    }

                    Utils.updateElementXY(cursorState.currentCard, x, y, w, h);

                    requestAnimationFrame(loop);
                })
            };
    
            animate();
        }
    };

    const unselectCard = function() {
        if (state.selectedCards.includes(cursorState.currentCard)) {
            state.selectedCards.splice(state.selectedCards.indexOf(cursorState.currentCard), 1);

            const animate = function() {
                let { x, y, w, h, img } = cursorState.currentCard;
                const speed = 2;
                const yLimit = y + 6;
    
                requestAnimationFrame(function loop() {
                    ctx.clearRect(x, y - speed, w, h);
                    ctx.drawImage(img, x, y, w, h);
    
                    if (y <= yLimit) {
                        y += speed;
                    } else {
                        return null;
                    }

                    Utils.updateElementXY(cursorState.currentCard, x, y, w, h);
    
                    requestAnimationFrame(loop);
                })
            };
    
            animate();
        }
    };

    const cardChoosingEvents = function() {

        const updateCursorPosition = function() {
            if (! cursorState.disposed) {
                let direction = this;
                let pickedCard = null;
        
                if (pickedCard = state.inHandCards[state.cursorIndex + direction]) {
                    state.cursorIndex += direction;
                    cursorState.moved = true;
                    cursorState.direction = this;
                }
            }
        };

        
        const actions = {
            'ArrowUp': selectCard,
            'ArrowDown': unselectCard,
            'ArrowLeft': updateCursorPosition.bind(-1),
            'ArrowRight': updateCursorPosition.bind(+1),
            'z': gameObject.cardPlays.start
        }

        document.body.addEventListener('keydown', function(event) {
            console.log(event.key)
            if (actions[event.key]) {
                actions[event.key]();
            }
        });
    };

    setupDeck();

    object.start = function() {
        if (gameObject.state.CHOOSING_CARD) {
            pullCards();
        }
    }

    return object;
}

export default handCards;