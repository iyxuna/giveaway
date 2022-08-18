import React, {useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

const Fail = props => {
    const router = useRouter();

    const handleResult = e => {
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
                            {/*<img className={"profile_img"} src={""} />*/}
                        </header>

                        <div className={"inner result"}>
                            <div className={"img_wrap"}>
                                <img src={"/images/fail.png"} />
                            </div>
                            <button className={"main_btn fail"} onClick={e=>handleResult(e)}>당첨자보기</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ctx=>{
    const _query = ctx.query;
    return{
        props : {
        }
    }
}
export default Fail;