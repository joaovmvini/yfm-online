const getCollection = require('../database/getCollection');

const startRoutes = function(app) {
    app.get('/getAllCards', async (req, res) => {
        const cardList = await getCollection();
    
        return res.json({ cards: cardList });
    });
}

module.exports = startRoutes;