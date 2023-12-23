const mongoose = require("mongoose");

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected successfully in : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection