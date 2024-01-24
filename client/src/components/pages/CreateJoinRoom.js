import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CenterScreen, SpinningCat } from "../modules/util";

import { post } from "../../utilities";

import plus_icon from "../../assets/icons/plus_icon.png";
import people_icon from "../../assets/icons/people_icon.png";
import back_icon from "../../assets/icons/back_icon.png";

const BgScrollContainers = () => {
    return (
        <>
            <div className="absolute h-full w-full z-[-2] bg-scroll border-2 border-red-400">
            </div>
        </>
    );
};

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

    // font size: 20px, line height: 28px
    
    const Select = 
        <div className=" w-[400px] h-[170px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full mr-8">
                <img src={plus_icon} className="max-h-[125px] max-w-[125px] h-[125px] w-[125px] border-[#694F31] p-5 mb-[4px] border-[6px] rounded-2xl cursor-pointer bg-[#E7AE6C] hover:bg-[#CE9C63]" onClick={() => setSubScreen("create")}/>
                <div className="text-xl font-medium candy-beans text-[#694F31]">
                    create room
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full ml-8">
                <div className="flex justify-center items-center max-h-[125px] max-w-[125px] h-[125px] w-[125px] border-[#694F31] p-5 mb-[4px] border-[6px] rounded-2xl cursor-pointer bg-[#E7AE6C] hover:bg-[#CE9C63]" onClick={() => setSubScreen("join")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#694F31" class="w-[100px] h-[100px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                </div>
                <div className="text-xl font-medium candy-beans text-[#694F31]">
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
            
            <Link to="/join/room" className="flex items-center justify-center border-2 border-black bg-[#FAB566] hover:bg-[#F6AA54] rounded-2xl" onClick={() => {
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
            <button className="flex items-center justify-center border-2 border-black bg-[#FAB566] hover:bg-[#F6AA54] rounded-2xl" onClick={() => {
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

    //console.log(mapping[subScreen]);


    

    return (
        <div className="h-full w-full absolute flex items-center justify-center overflow-hidden">
            <CenterScreen content={mapping[subScreen]}/>
            <div className="absolute h-full w-full z-[-2] flex items-center justify-center overflow-hidden">
                <BgScrollContainers/>
                 {/* TODO: add a component w state var that has chance of being randomly changed
             to one of x cat spin classes (i.e. spinning diagonally down), on z-[-1]; same for other file */}
            </div>
            <SpinningCat first={1}/>
        </div>
    );
};

// j use CenterScreen as a wrapper and define multiple components in this file for subpages

export default CreateJoinRoom;