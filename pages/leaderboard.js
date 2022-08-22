import React, {useState} from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";
import {redirect} from "next/dist/server/api-utils";
import Port from "../config";

const Leaderboard = ({_logs=[], _week, _selectList=[]}) => {
    const [ selected, setSelected ] = useState(_week);
    const router = useRouter();

    const handleSelectChange = e => {
        setSelected(e.target.value);
        router.push(`/leaderboard?week=${e.target.value}`);
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
                            <select value={selected} onChange={handleSelectChange}>
                                {_selectList.map((val, key)=>(
                                    <option key={key} value={val.week}>{val.week}</option>
                                ))}
                            </select>
                        </header>

                        <div className={"inner"}>
                            <div className={"board_wrap"}>
                                <ul className={"board_list"}>
                                    {_logs.map((val, idx)=>{
                                        return(
                                            <li className={"items on"} key={idx}>
                                                <div className={"item"}>
                                                    <span className={"rank"}>{idx+1}</span>
                                                    <img className={"profile_img"} src={val?.user_id?.image_url} />
                                                    <span className={"name"}>{val?.user_id?.name}</span>
                                                </div>
                                                {val.result==="당첨" ? <img className={"result_img"} src={"/images/img-fire@2x.png"} /> : <></>}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ctx=>{
    const week = !ctx.query?.week ? "" : ctx.query?.week;
    const _logs = await axios.get(`http://localhost:${Port.port}/api/resultLog/result?week=${week}`);
    const _selectList = await axios.get(`http://localhost:${Port.port}/api/resultLog/select`);

    if(_selectList.data.data.length === 0 ){
        return{
            redirect: {
                source: '/',
                destination: '/',
                permanent: false
            }
        }
    }

    return{
        props : {
            _logs: _logs.data.data,
            _week: _logs.data.week,
            _selectList: _selectList.data.data
        }
    }
}
export default Leaderboard;