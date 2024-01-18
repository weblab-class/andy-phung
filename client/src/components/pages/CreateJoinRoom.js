import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CenterScreen } from "../modules/util";


import plus_icon from "../../assets/icons/plus_icon.png";
import people_icon from "../../assets/icons/people_icon.png";
import back_icon from "../../assets/icons/back_icon.png";



const CreateJoinRoom = (props) => {
    const [subScreen, setSubScreen] = useState("select"); // one of: select, create, join

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
        <div className="bg-slate-400 w-10 h-10 flex">
            <img src={back_icon} width="30px" height="auto" className="cursor-pointer" onClick={() => setSubScreen("select")}/>
            create
        </div>
    
    const JoinRoomForm = 
        <div className="bg-slate-400 w-10 h-10 flex">
            <img src={back_icon} width="30px" height="auto" className="cursor-pointer" onClick={() => setSubScreen("select")}/>
            join
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
        </div>
    );
};

// j use CenterScreen as a wrapper and define multiple components in this file for subpages
// check catbook for how to best write form/post input (?)

export default CreateJoinRoom;