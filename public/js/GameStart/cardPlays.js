import Utils from "../Util/util.js";

const cardPlays = function(gameObject) {
    const [canvas, ctx] = [gameObject.component, gameObject.ctx];
    const object = {};

    const { state, cursorState, cardState } = gameObject.handCards;
    
    const middleDimensions = {
        x: (canvas.width / 2) - (cardState.width / 2 ),
        y: 200
    };

    const getPos = function(i) {
        if (i == 0) {
            return [canvas.width - cardState.width, 200]
        } 
        return [canvas.width - cardState.width * (2 + i), 200];
    };

    const getDirection = function(c, x) {
        return (c.x < x ? 1 : -1);
    };

    const animations = {
        eliminate: function(priority, out) {

        },
        multipleCards: function(cards) {
            gameObject.arena.redraw();

            const animate = function() {
                let positions = [];

                for (let c = 0; c < cards.length; c ++) {
                    let pos = getPos(c);
                    let dx = getDirection(cards[c], pos[0]);
                    positions.push([].concat(pos, dx));
                }

                requestAnimationFrame(function loop() {
                    cards.forEach((card, index) => {
                        let [x, y, dx] = positions[index];
                        let dy = -1;
                        let moveX = ! Utils.isResultBetween(x / card.x)
                        let moveY = ! Utils.isResultBetween(y / card.y);

                        if (moveX || moveY) {
                            ctx.clearRect(card.x - cardState.speed * dx, card.y - cardState.speed * dy, card.w, card.h);
                            ctx.drawImage(card.img, card.x, card.y, card.w, card.h);

                            if (! moveX) {
                                dx = 0;
                            } else if (! moveY) {
                                dy = 0;
                            }

                            gameObject.handCards.disposeCursor();
                            gameObject.handCards.redrawAll();

                            card.x += cardState.speed * dx;
                            card.y += cardState.speed * dy;
                        }
                        

                    });

                    requestAnimationFrame(loop);
                });
            }

            animate();
        }, 
        singleCard: function(card) {
            const animate = function() {
                if (card.x > middleDimensions.x) {
                    var dx = -1;
                } else {
                    var dx = 1;
                }
                
                let dy = -1;
                let moveX = null;
                let moveY = null;

                requestAnimationFrame(function loop() {
                    moveX = ! Utils.isResultBetween(middleDimensions.x / card.x);
                    moveY = ! Utils.isResultBetween(middleDimensions.y / card.y);
                    
                    if (moveX || moveY) {
            
                        gameObject.arena.redraw();

                        ctx.clearRect(card.x - cardState.speed * dx, card.y - cardState.speed * dy, card.w, card.h);
                        ctx.drawImage(card.img, card.x, card.y, card.w, card.h);

                        if (! moveX) {
                            dx = 0;
                        } else if (! moveY) {
                            dy = 0;
                        }

                        gameObject.handCards.disposeCursor();
                        gameObject.handCards.redrawAll();
                        
                        card.x += cardState.speed * dx;
                        card.y += cardState.speed * dy;

                    }


                    requestAnimationFrame(loop);
                });
            }

            animate();
        }
    };

    const sendCard = function() {
        if (state.selectedCards.length > 1) {
            animations.multipleCards(state.selectedCards);
        } else {
            animations.singleCard(cursorState.currentCard);
        }
    };
    
    object.start = function() {
        sendCard();
    };

    return object;
};

export default cardPlays;