const mongoose = require("mongoose");

const resultLogSchema = new mongoose.Schema({
    eid: { type: String },
    week: { type: String }, // 2022-32
    result: { type: String }, // 성공/실패
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("result_log", resultLogSchema, "result_log");