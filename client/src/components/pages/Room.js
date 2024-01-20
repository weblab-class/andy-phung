import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket, handleKeyPress } from "../../client-socket.js";
import { post } from "../../utilities"; 

import back_icon from "../../assets/icons/back_icon.png";

import cursor_icon from "../../assets/icons/cursor_icon.png";
import pet_icon from "../../assets/icons/pet_icon.png";
import laser_icon from "../../assets/icons/laser_icon.png";
import camera_icon from "../../assets/icons/camera_icon.png";
import store_icon from "../../assets/icons/store_icon.png";
import music_icon from "../../assets/icons/music_icon.png";



/*
TODO:
- pixijs canvas on z-0
- tasks on z-5
- toolbar on z-5

*/

const Tasks = (props) => {
    return <div className="absolute top-[56px] left-[50%] absolute-div-center-offset w-[95%] h-[450px] bg-blue-400 pl-[20px] pr-[20px] pb-[20px]">
        <div className="bg-blue-600 h-full w-full">

        </div>
    </div>
}



const SubToolBar = (props) => {
    return <div className="absolute flex flex-col justify-center items-center w-[47.5px] h-[157.5px] right-[30px] bottom-[95px] bg-gray-300/[0.50] z-[5] rounded-lg border-4 border-black">
        <div className={`w-[30px] h-[30px] mb-[5px] ${props.cursorState == "cursor" ? "bg-gray-400/25" : "bg-gray-300/0"} hover:bg-gray-400/25 rounded-lg z-[5]`} onClick={() => {
            props.setCursorState("cursor");
        }}>
            <img src={cursor_icon} className="p-0 m-0 z-[5] "/>
        </div>
        <div className={`w-[30px] h-[30px] mb-[5px] ${props.cursorState == "pet" ? "bg-gray-400/25" : "bg-gray-300/0"} hover:bg-gray-400/25 rounded-lg z-[5]`} onClick={() => {
            props.setCursorState("pet");
        }}>
            <img src={pet_icon} className="p-0 m-0 z-[5]"/>
        </div>
        <div className={`w-[30px] h-[30px] mb-[5px] ${props.cursorState == "laser" ? "bg-gray-400/25" : "bg-gray-300/0"} hover:bg-gray-400/25 rounded-lg z-[5]`} onClick={() => {
           props.setCursorState("laser"); 
        }}>
            <img src={laser_icon} className="p-0 m-0 z-[5]"/>
        </div>
        <div className={`w-[30px] h-[30px] ${props.cursorState == "camera" ? "bg-gray-400/25" : "bg-gray-300/0"} hover:bg-gray-400/25 rounded-lg z-[5]`} onClick={() => {
           props.setCursorState("camera"); 
        }}>
            <img src={camera_icon} className="p-0 m-0 z-[5]"/>
        </div>
    </div>
}

const ToolBar = (props) => {

    return <div>
        <SubToolBar cursorState={props.cursorState} setCursorState={props.setCursorState}/>
        <img src={store_icon} className="absolute w-[30px] h-[30px] bottom-[52.5px] right-[38.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]"/>
        <img src={music_icon} className="absolute w-[30px] h-[30px] bottom-[15px] right-[38.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]"/>
    </div>

}



const Room = (props) => {
    const navigate = useNavigate(); 
    const [cursorState, setCursorState] = useState("cursor"); // cursor, pet, laser, camera
    // uh

    const cursorMapper = {
        "cursor": "cursor-default",
        "pet": "cursor-wait",
        "laser": "cursor-s-resize",
        "camera": "cursor-crosshair",
    }

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if(props.currentRoomID != "") { 

            
            socket.on(props.currentRoomID, (update) => {
                console.log(update.body);
                console.log(update.connected);
            });

            console.log(`client listening on ${props.currentRoomID}`);
    
            window.addEventListener("keypress", (event) => {
                handleKeyPress(event.key, props.currentRoomID);
                console.log("key pressed");
                // TODO: clean everything up + maybe refactor/package shit into client-socket, etc

            });
    
            // remove event listener on unmount
            return () => {
                window.removeEventListener("keypress", (event) => {
                    handleKeyPress(event, props.currentRoomID);
                });
            };
        }
    }, [props.currentRoomID]); 

    return (
        <div className={`flex flex-col h-full w-full ${cursorMapper[cursorState]}`}>
            <img src={back_icon} width="30px" height="30px" className="cursor-pointer" onClick={() => {
                post("/api/leaveroom", { roomid: props.currentRoomID });
                props.setCurrentRoomID("");
                navigate("/join");
            }}/>
            <Tasks/>
            <ToolBar cursorState={cursorState} setCursorState={setCursorState}/>
        </div>
    )
}

export default Room;