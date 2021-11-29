const arena = function(gameObject) {
    const [canvas, ctx] = [gameObject.component, gameObject.ctx];

    const object = {
        locations: {
            me: [{}, {}, {}, {}, {}],
            rival: [{}, {}, {}, {}, {}]
        },
        slotWidth: 110,
        slotHeight: 120
    }

    const drawArena = function() {
        const { slotWidth, slotHeight } = object;

        let curr = 'me';

        for (let i = 1; i <= 2; i ++) {
            if (i == 2) {
                curr = 'rival';
            }

            let yInitial = i * 60 * (i == 2 ? 0.7 : 1) + (i - 1) * slotHeight;
            
            for (let j = 1; j <= 5; j ++) {
                let x = j * 26.5 + (j - 1) * slotWidth;
                ctx.rect(x, yInitial, slotWidth, slotHeight);
                ctx.strokeStyle = "blue";
                ctx.stroke();

                const currLocObj = object.locations[curr][j - 1];
                
                currLocObj.x = x;
                currLocObj.y = yInitial;
                currLocObj.w = slotWidth;
                currLocObj.h = slotHeight;
            }
        }
    };

    object.redraw = function() {
        let curr = 'me';

        for (let i = 0; i < 2; i ++) {
            let ref = object.locations[curr];

            if (i) {
                curr = 'rival';
            }

            for (let j = 0; j < 5; j ++) {
                ctx.rect(ref[j].x, ref[j].y, ref[j].w, ref[j].h);
                ctx.strokeStyle = "blue";
                ctx.stroke();
            }
        }
    };

    object.start = function() {
        drawArena();
    }

    return object;
}

export default arena;