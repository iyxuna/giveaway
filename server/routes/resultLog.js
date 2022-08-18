const express = require("express");
const router = express.Router();

const Log = require("../models/resultLog");
const User = require("../models/user");

const currentWeek =()=>{
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    return String( currentDate.getFullYear() ) + "-"+String( Math.ceil(days / 7)-1);
}

router.get("/", async (req, res)=>{
    const result = await Log.find({}).exec();

    await res.json({ data: result });
});

// 뽑기한적 있는지 체크
router.post("/check", async (req, res)=>{
    const result = req.body;

    const findLog = await Log.find({ week: result.week, eid: result.eid }).exec();
    const logFlag = findLog.length > 0 ? true : false;

    if( !logFlag ){
        await res.json({ success: true });
    }else{
        await res.json({ success: false, msg: "이미 뽑았습니다. 다음 주에 도전하세요!"})
    }
});

// 로그 생성
router.post("/log", async (req, res)=>{
    const result = req.body;
    const user = await User.findOne({ eid: result.eid }).exec();

    const newLog = new Log;

    newLog.eid = result.eid;
    newLog.week = result.week;
    newLog.result = result.result;
    newLog.user_id = user.id; // 유저정보 가져옴

    await newLog.save();
    await res.json({ data: newLog });
});

// 로그 전체 가져오기
router.get("/result", async (req, res)=>{
    const findLog = await Log.find({ week: currentWeek() }).populate("user_id").exec();

    await res.json({ data: findLog, week: currentWeek() });
});

module.exports = router;