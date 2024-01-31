import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CenterScreen, SpinningCat } from "../modules/util";

import { post } from "../../utilities";

import plus_icon from "../../assets/icons/plus_icon.png";
import people_icon from "../../assets/icons/people_icon.png";
import back_icon from "../../assets/icons/back_icon.png";

const svgclr = "#6A5239";

const BgScrollContainers = () => {
    return (
        <>
            <div className="absolute h-full w-full z-[-2] bg-scroll">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke={svgclr} className="max-h-[125px] max-w-[125px] h-[125px] w-[125px] border-clr p-5 mb-[4px] border-[6px] rounded-2xl cursor-pointer hover:bg-[#D2B38C]" onClick={() => setSubScreen("create")}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div className="text-xl font-medium candy-beans text-clr">
                    create room
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full ml-8">
                <div className="flex justify-center items-center max-h-[125px] max-w-[125px] h-[125px] w-[125px] border-clr p-5 mb-[4px] border-[6px] rounded-2xl cursor-pointer hover:bg-[#D2B38C]" onClick={() => setSubScreen("join")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={svgclr} className="w-[100px] h-[100px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                </div>
                <div className="text-xl font-medium candy-beans text-clr">
                    join room
                </div>
            </div>
        </div>
    
    const CreateRoomForm = 
        <div className="w-[400px] h-[200px] flex flex-col">
            
            <svg onClick={() => setSubScreen("select")} className="top-[10px] left-[10px] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-65" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <div className="flex flex-col items-center mr-auto ml-auto min-w-[320px] h-[150px] justify-between ">
                <div className="flex flex-row justify-between w-full h-[100px] ">
                    <div className="w-[170px]">
                        <div className="flex flex-col">
                            <div className="simply-rounded text-clr text-sm">
                            max capacity
                            </div>
                            <select className="w-[60px] mb-[2px] text-xl text-clr simply-rounded border-clr border-4 bg-clr rounded-xl" defaultValue="4" onChange={(event) => {
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
                        <div className="flex flex-col">
                            <div className="simply-rounded text-clr text-sm">
                                theme 
                            </div>
                            <select className="w-[120px] text-xl text-clr simply-rounded border-clr border-4 bg-clr rounded-xl" onChange={(event) => {
                                theme.current = event.target.value;
                            }}>
                                <option value="cafe">cafe</option>
                            </select>
                        </div>
                    </div>
                    <img src={"https://i.imgur.com/WV2O28t.png"} width={190} height={100} className="border-8 border-clr rounded-xl"/>
                </div>
                <Link to="/join/room" className="w-full text-lg h-[30px] flex items-center justify-center border-[3px] text-clr simply-rounded border-clr bg-[#DEB484] hover:bg-[#DBAC78] rounded-2xl" onClick={() => {
                props.setBiscuitsJustEarned(0);
                props.setTheme(theme.current);
                post("/api/joinroom", {
                    user: props.userObj.user,
                    init: true,
                    capacity: capacity.current,
                    theme: theme.current,
                }).then((res) => {
                    props.setCurrentRoomID(res.roomid); 
                    if(!props.userObj.user.catsSeen.includes(res.catname)) {
                        props.updateUserObj({_id: props.userObj.user._id, push: {catsSeen: res.catname}, append: "push"});
                    };
                });
                }}>create room!</Link>
            </div>
            
        </div>
    
    // #DEB484
    // hover: #DBAC78
    const JoinRoomForm = 
        <div className="w-[400px] h-[200px] flex flex-col">
            <svg onClick={() => {setSubScreen("select"); resetJoinStates();}} className="top-[10px] left-[10px] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-65" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <div className="relative min-w-[363px] h-[150px] mr-auto ml-auto flex flex-col justify-center">
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="ml-[2px] text-clr text-lg simply-rounded mr-[7px]">
                        join code:
                    </div>
                    <input className="w-[272px] border-2 border-clr rounded-lg" autoFocus type="text" onChange={(event) => {
                        roomid.current = event.target.value;
                    }}/>
                </div>
                <button className="mt-[7px] w-full text-lg text-clr simply-rounded flex items-center justify-center border-[3px] border-clr bg-[#DEB484] hover:bg-[#DBAC78] rounded-2xl" onClick={() => {
                    props.setBiscuitsJustEarned(0);
                    post("/api/joinroom", {
                        roomid: roomid.current,
                        user: props.userObj.user,
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
                }}>join room!</button>
                {invalidCode && (
                <div className="absolute bottom-0 left-4 text-clr">
                    invalid code lol
                </div>
            )}
            {fullState && (
                <div className="absolute bottom-0 left-4 text-clr simply-rounded">
                    full room :(
                </div>
            )}
            </div>

            
            
        </div>

    const mapping = { // lol
        "select": Select,
        "create": CreateRoomForm,
        "join": JoinRoomForm
    };

    //console.log(mapping[subScreen]);

    const audioRef = useRef();

    useEffect(() => {
        audioRef.current.volume = props.userObj.user.musicVolume / 100;
        audioRef.current.play().catch(() => {
            //console.log("audio play failed"); 
        });
        audioRef.current.loop = true;
    }, []);

    useEffect(() => {
        audioRef.current.volume = props.userObj.user.musicVolume / 100;
    }, [props.userObj.user.musicVolume]);

    return (
        <div className="h-full w-full absolute flex items-center justify-center overflow-hidden">
            <CenterScreen content={mapping[subScreen]}/>
            <div className="absolute h-full w-full z-[-2] flex items-center justify-center overflow-hidden">
                <BgScrollContainers/>
            </div>
            <SpinningCat first={1}/>
            <audio ref={audioRef} src="https://cdn.discordapp.com/attachments/1201919002264490034/1202044175420493866/Copyright_Locked_Chill_Lofi_Hiphop_-_Kimochi_by_FrkA2.mp3"/>
        </div>
    );
};

// j use CenterScreen as a wrapper and define multiple components in this file for subpages

export default CreateJoinRoom;