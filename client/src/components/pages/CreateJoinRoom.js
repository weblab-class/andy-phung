import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CenterScreen } from "../modules/util";

import { post } from "../../utilities";

import plus_icon from "../../assets/icons/plus_icon.png";
import people_icon from "../../assets/icons/people_icon.png";
import back_icon from "../../assets/icons/back_icon.png";



const CreateJoinRoom = (props) => {
    const [subScreen, setSubScreen] = useState("select"); // one of: select, create, join

    // bc we dont we to trigger rerenders
    const capacity = useRef(4);
    const theme = useRef("cafe");
    const roomid = useRef("");

    const [ invalidCode, setInvalidCode ] = useState(false);
    const [ fullState, setFullState ] = useState(false);
    const resetJoinStates = () => {
        setInvalidCode(false);
        setFullState(false);
    }

    const navigate = useNavigate();    

    useEffect(() => { // kicking user off if not logged in + tries to go to this route
        if(props.userId == undefined) {
            navigate("/");
        }
    }, [])
    
    const Select = 
        <div className=" w-[400px] h-[170px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full mr-8">
                <img src={plus_icon} className="max-h-[70%] border-black p-5 mb-1 border-4 rounded-2xl cursor-pointer hover:bg-gray-300" onClick={() => setSubScreen("create")}/>
                <div className="text-xl">
                    create room
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full ml-8">
                <img src={people_icon} className="max-h-[70%] border-black p-5 mb-1 border-4 rounded-2xl cursor-pointer hover:bg-gray-300" onClick={() => setSubScreen("join")}/>
                <div className="text-xl">
                    join room
                </div>
            </div>
        </div>
    
    const CreateRoomForm = 
        <div className="w-[400px] h-[200px] flex flex-col">
            
            <img src={back_icon} width="30px" height="30px" className="cursor-pointer" onClick={() => setSubScreen("select")}/>
            <div>
                max capacity:
                <select className="w-[60px]" defaultValue="4" onChange={(event) => {
                    capacity.current = event.target.value;
                }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>
            <div>
                theme: 
                <select onChange={(event) => {
                    theme.current = event.target.value;
                }}>
                    <option value="cafe">cafe</option>
                    <option value="backyard">backyard</option>
                    <option value="hayden library">hayden library</option>
                </select>
            </div>
            
            <Link to="/join/room" className="flex items-center justify-center border-2 border-black rounded-2xl" onClick={() => {
                post("/api/joinroom", {
                    init: true,
                    capacity: capacity.current,
                    theme: theme.current,
                }).then((res) => {
                    props.setCurrentRoomID(res.roomid); 
                });
            }}>create</Link>
        </div>
    
    const JoinRoomForm = 
        <div className="w-[400px] h-[200px] flex flex-col">
            <img src={back_icon} width="30px" height="30px" className="cursor-pointer" onClick={() => {setSubScreen("select"); resetJoinStates();}}/>
            <div>
                join code: 
                <input type="text" onChange={(event) => {
                    roomid.current = event.target.value;
                }}/>
            </div>
            <button className="flex items-center justify-center border-2 border-black rounded-2xl" onClick={() => {
                post("/api/joinroom", {
                    roomid: roomid.current,
                }).then((res) => {
                    if(res.roomid) {
                        props.setCurrentRoomID(res.roomid);
                        setInvalidCode(false);
                        setFullState(false);
                        navigate("/join/room");
                    } else if (res.errState == "invalid") {
                        setInvalidCode(true);
                        setFullState(false);
                    } else if (res.errState == "full") {
                        setFullState(true);
                        setInvalidCode(false);
                    }
                });
            }}>join</button>
            {invalidCode && (
                <div className="flex items-center justify-center w-[300px] h-[100px]">
                    invalid code lol
                </div>
            )}
            {fullState && (
                <div className="flex items-center justify-center w-[300px] h-[100px]">
                    full room :(
                </div>
            )}
        </div>

    const mapping = { // lol
        "select": Select,
        "create": CreateRoomForm,
        "join": JoinRoomForm
    };

    console.log(mapping[subScreen]);

    return (
        <div className="h-full w-full absolute flex items-center justify-center">
            <CenterScreen content={mapping[subScreen]}/>
            <div className="absolute h-full w-full z-[-1] flex items-center justify-center overflow-hidden">
                <div className="absolute h-full w-full z-[-1] bg-scroll">
                </div>
            </div>
        </div>
    );
};

// j use CenterScreen as a wrapper and define multiple components in this file for subpages

export default CreateJoinRoom;