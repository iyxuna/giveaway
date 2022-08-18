const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/", async (req, res)=>{
  const result = await User.find({}).exec();

  await res.json({data : result })
});

// 비밀번호 암호화
router.get("/bcrypt",  async (req, res)=>{
    const users = await User.find({}).exec();

    // 암호화해서 다시 저장
    for await (const user of users){
        const bc = bcrypt.hashSync(user.password, 10);
        user.password = bc;
        user.save();
    }

    await res.json({ data: users });
});

// 비밀번호 검증
router.post("/pwCheck", async (req, res)=>{
    const result = req.body;

    const user_id = await User.findOne({ eid: result.eid }).exec(); // 유저 아이디를 가져옴
    const user_pw = result.password; // 입력한 비밀번호
    const bc = user_id.password; // 가져온 유저의 저장된 암호화 비밀번호

    const same = bcrypt.compareSync(user_pw, bc); // 비밀번호 검증

    await res.json({ data: same });
});

module.exports = router;