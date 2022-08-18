import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";
import proxy from "../../valtio"
import {useSnapshot} from "valtio";

const state = proxy;

const Id = ({_users=[], _numbers, _eid, _week}) => {
    const router = useRouter();
    const snap = useSnapshot(state);

    let image = "";
    _users.map((val, idx)=>{
       if( val.eid === _eid ){
           image = val.image_url;
       }
    });

    const handleGiveaway = e => {
        let _result = "";
        if( snap.selectedID === -1 ){
            _result = "미당첨";
        }else{
            _result = "당첨";
        }

        axios.post("/api/resultLog/log", { eid: _eid, week: _week, result: _result }).then(res=>{
            if( _result == "당첨" ){
                router.push("/success");
            }else{
                router.push("/fail");
            }
        });
        e.preventDefault();
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
                            <img className={"profile_img"} src={image} />
                        </header>

                        <div className={"inner result"}>
                            <div className={"img_wrap"}>
                                <img src={"/images/giveaway.png"} />
                            </div>
                            <button className={"main_btn"} onClick={e=>handleGiveaway(e)}>바로 뽑기</button>
                        </div>

                    </div>
                    {/*    <img className={"fire_img"} src={"/images/fire@2x.png"}/>*/}
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ctx=>{
    const _query = ctx.query;
    const _eid = ctx.params.id;
    const _week = ctx.query.week;
    const _users = await axios.get("http://localhost:3000/api/user");
    const _numbers = await axios.get("http://localhost:3000/api/admin");

    return{
        props : {
            _users: _users.data.data,
            _numbers: _numbers.data.data,
            _eid: _eid,
            _week: _week
        }
    }
}
export default Id;