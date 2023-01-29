const mongoose = require("mongoose")

const initializeDBConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Connected Successfully To Database")
    } catch (error) {
        console.error("Database Connection Failed...", error)
    } finally {

    }
}

module.exports = initializeDBConnection