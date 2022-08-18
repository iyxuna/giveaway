const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    eid: { type: String },
    week: { type: String },
    number: { type: Array }
});

module.exports = mongoose.model("admin", adminSchema, "admin");