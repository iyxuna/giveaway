const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    eid: { type: String },
    name: { type: String },
    image_url: { type: String },
    password: { type: String }
});

module.exports = mongoose.model("user", userSchema, "user");