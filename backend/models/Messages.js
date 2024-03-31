const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("messages", messageSchema)