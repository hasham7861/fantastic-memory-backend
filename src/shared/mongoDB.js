const mongoose = require('mongoose');

async function connectToDB() {
    const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };
    try {
        console.log('Attempting to connect to DB...')
        await mongoose.connect(process.env.MONGO_CONNECTION_URL, connectionOptions)
        console.log('MongoDB is setup and connected');
    } catch (error) {
        console.log(`MongoDB failed to connect with error '${JSON.stringify(error)}'`)
    }
}

module.exports = {
    connectToDB
}
