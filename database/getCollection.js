const mongo = require('./mongo');

async function getCollection() {
    const mongoose = await mongo();

    const collection = mongoose.connection.collection('cards');
    const allCards = await collection.find({}).toArray();

    mongoose.connection.close();
    return allCards;
}

module.exports = getCollection;