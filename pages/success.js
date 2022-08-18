import React, {useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

const Success = props => {
    const router = useRouter();

    // 자랑하기
    const handleShare = e => {
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
                        </header>

                        <div className={"inner result"}>
                            <div className={"img_wrap"}>
                                <img src={"/images/success.jpg"} />
                            </div>
                            <button className={"main_btn"} onClick={e=>{handleShare(e)}}>자랑하기</button>
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
export default Success;