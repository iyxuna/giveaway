import React, {useState} from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";

const Admin = ({_allLength}) => {
    const router = useRouter();
    const [ length, setLength ] = useState("");

    const handleClick = (e, idx)=> {
        const _userLength = length; // 당첨인원
        let number = [];
        while (number.length < _userLength) {
            let num = parseInt(Math.random() * _allLength + 1);
            if (number.indexOf(num) == -1) {
                number.push(num);
            }
        }
        number.sort((a,b)=>a-b);

        axios.post("/api/admin/number", {number: number}).then(res=>{
            if( res.data.success ){
                alert(res.data.msg);
                router.push("/");
            }else{
                alert(res.data.msg);
                router.push("/admin");
                setLength("");
            }
        });
        e.preventDefault();
    }

    const handleLengthChanged = e => {
        setLength(e.target.value);
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
                            <button className={"lb_btn"}>리더보드</button>
                        </header>

                        <div className={"inner"}>
                            <div className={"admin_wrap"}>
                                <div className={"input_area"}>
                                    <input type={"number"} id={"count"} min={1} className={"form-control"} placeholder={"당첨인원 입력"} value={length} onChange={handleLengthChanged}/>
                                </div>
                                <button className={"main_btn"} onClick={e=>handleClick(e)}>당첨번호 생성</button>
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
    const _users = await axios.get("http://localhost:3000/api/user");

    return{
        props : {
            _allLength: _users.data.data.length
        }
    }
}
export default Admin;
