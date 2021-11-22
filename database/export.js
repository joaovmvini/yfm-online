const mongo = require('./mongo');
const allCards = require('../cardList.json');
const Fs = require('fs');

const connectToMongoDB = async function() {
    const mongoose = await mongo();

    const Schema = mongoose.Schema;

    const cardSchema = new Schema({
        name: String,
        atk: Number,
        def: Number,
        image: String
    });

    const cardPaths = Fs.readdirSync('../public/cards').map(cardName => '/cards/' + cardName);

    const Card = mongoose.model('card', cardSchema);

    for (let i = 0; i < allCards.length; i ++) {
        allCards[i].image = cardPaths[i];
        var card = new Card(allCards[i]);

        await card.save();
        console.log(allCards[i].name + ' saved.');
    }
};
