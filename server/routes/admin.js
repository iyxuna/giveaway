const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");

const currentWeek =()=>{
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    return String( currentDate.getFullYear() ) + "-"+String( Math.ceil(days / 7)-1);
}

router.get("/", async (req, res)=>{
    const result = await Admin.find({}).exec();

    await res.json({ data: result });
});

router.post("/number", async (req, res)=>{
    const result = req.body;
    const newAdmin = new Admin;

    const findWeek = await Admin.findOne({ week: currentWeek() }).exec();
    const weekFlag = findWeek ? true : false;

    if( !weekFlag ){
        newAdmin.number = result.number;
        newAdmin.week = currentWeek();

        await newAdmin.save();
        await res.json({ data: newAdmin, success: true, msg: "이번 주 당첨번호 생성이 완료되었습니다." });
    }else{
        await res.json({ success: false, msg: "이미 당첨번호를 생성하였습니다."});
    }
});

router.get("/gift", async (req, res)=>{
    const findWeek = await Admin.findOne({ week: currentWeek() }).exec();

    await res.json({ data: findWeek });
})

module.exports = router;