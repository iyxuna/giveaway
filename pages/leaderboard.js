import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";

const Leaderboard = ({_logs, _week}) => {
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
                            <button className={"lb_btn"}>{_week}</button>
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
                                                 {/*당첨인 애들만 */}
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
    const _query = ctx.query;
    const _logs = await axios.get("http://localhost:3000/api/resultLog/result");

    return{
        props : {
            _logs: _logs.data.data,
            _week: _logs.data.week
        }
    }
}
export default Leaderboard;