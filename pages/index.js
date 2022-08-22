import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";
import proxy from "../valtio"
import {useSnapshot} from "valtio";
import Port from "../config";

const state = proxy;

const Index = ({_users=[], _numbers=[], _gift=null, _logs=[]}) => {
    const router = useRouter();
    const snap = useSnapshot(state);

    // 현재 주차
    const currentWeek =()=>{
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        return String( currentDate.getFullYear() ) + "-"+String( Math.ceil(days / 7)-1);
    }

    // 현재 주차의 숫자를 가져와서 비교
    let numbers = [];
    let week = "";
    _numbers.map((val, key)=>{
        if( val.week === currentWeek() ){
            numbers = val.number;
            week = val.week;
        }
    });

    // 현재 주차 로그에 아이디 있는지 체크
    let log_users = [];
    let log_week = "";
    _logs.map((val, key)=>{
        if( val.week === currentWeek() ){
            log_users.push(val.eid);
            log_week = val.week;
        }
    })

    const handleClick = (e, idx)=> {
        if( _gift === null ){
            return
        }
        if( log_users.indexOf(idx) !== -1 ){
            return
        }

        const currentWeek = week;
        const result = numbers;
        const match = result.indexOf(parseInt(idx));

        const _pw = prompt(e.target.id + "님, 비밀번호를 입력해주세요!", "");

        // 비밀번호 검증
        axios.post("/api/user/pwCheck", { password: _pw, eid: idx }).then(res=>{
            if( res.data.data ){
                // 뽑기 했는지 체크
                axios.post("/api/resultLog/check", {eid: idx, week: week}).then(res=>{
                    if( res.data.success ){
                        router.push(`/giveaway/${idx}?week=${currentWeek}`);
                    }else{
                        alert(res.data.msg);
                        router.push("/");
                    }
                });
                e.preventDefault();
            }else{
                alert("비밀번호를 확인해주세요.");
                router.push("/");
            }
        });
        e.preventDefault();

        state.selectedID = match;
    }

    const handleLeaderboard = e => {
        router.push("/leaderboard");
    }

    return (
        <>
            <div className={"container"}>
                <div className={"main"}>
                    <div className={"app"}>

                        <header className={"header"}>
                            <a href={"/"}>
                                <div className={"logo"}>
                                    <img src={"/images/logo@2x.png"} />
                                    <span className={"logo_title"}>GIVEAWAY</span>
                                </div>
                            </a>
                            <button className={"lb_btn"} onClick={e=>handleLeaderboard(e)}>리더보드</button>
                        </header>

                        <div className={`inner ${_gift===null ? "gray" : ""}`}>
                            <h1 className={"notice"}>이벤트 기간이 아닙니다.</h1>
                            <div className={"user_wrap"}>
                                {_users.map((val, idx)=>(
                                    <div key={idx} id={val.eid} className={`user_card ${log_users.indexOf(val.eid) !== -1 ? "disable_card" : ""}`} onClick={e=>handleClick(e, val.eid)}>
                                        <div className={"hover_box"} id={val.name}>선택</div>
                                        <img src={val.image_url} alt={val.name} />
                                        <span>{val.name} </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ctx=>{
    const _query = ctx.query;

    const _users = await axios.get(`http://localhost:${Port.port}/api/user`);
    const _numbers = await axios.get(`http://localhost:${Port.port}/api/admin`);
    const _gift = await axios.get(`http://localhost:${Port.port}/api/admin/gift`);
    const _logs = await axios.get(`http://localhost:${Port.port}/api/resultLog`);

    return{
        props : {
            _users: _users.data.data,
            _numbers: _numbers.data.data,
            _gift: _gift.data.data,
            _logs: _logs.data.data
        }
    }
}
export default Index;
