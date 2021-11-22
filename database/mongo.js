const mongoose = require('mongoose');
const cfg = require('./cfg.json');

const mongoPath = `mongodb+srv://yfm-online:${cfg.password}@cluster0.lngvz.mongodb.net/yfm-online?retryWrites=true&w=majority`;

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return mongoose;
};