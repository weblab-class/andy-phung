import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket, handleKeyPress } from "../../client-socket.js";
import { post } from "../../utilities"; 
import { Modal } from "../modules/util.js";

import back_icon from "../../assets/icons/back_icon.png";

import cursor_icon from "../../assets/icons/cursor_icon.png";
import pet_icon from "../../assets/icons/pet_icon.png";
import laser_icon from "../../assets/icons/laser_icon.png";
import camera_icon from "../../assets/icons/camera_icon.png";
import store_icon from "../../assets/icons/store_icon.png";
import music_icon from "../../assets/icons/music_icon.png";

import placeholder_pfp from "../../assets/placeholderpfp.png";

import close_icon from "../../assets/icons/close_icon.png";

// lmaoo what is this

/*
TODO:
- pixijs canvas on z-0
- tasks on z-5
- toolbar on z-5

*/

const TasksProfile = (props) => {
    return <div className="flex justify-center items-center w-full h-[40px] bg-blue-600 mb-[10px] z-[5]">
        <img src={placeholder_pfp} className="w-[35px] h-auto mr-[10px]"/>
        {props.name}
    </div>
}

const TaskListMutable = (props) => {

}

const Tasks = (props) => { // wtf
    return <div className="absolute flex justify-between top-[51px] left-[50%] absolute-div-center-offset w-[95%] h-[235px] bg-blue-200 pl-[20px] pr-[20px] pb-[20px] z-[5]">
            <div className="flex bg-blue-400 h-full w-[275px] left-0 z-[5]">
                <div className="flex flex-col bg-blue-500 h-full w-[275px] z-[5]">
                    <TasksProfile name={"chefandyy"}/>
                </div>
            </div>
            <div className="flex flex-row bg-blue-400 h-full min-w-[875px] w-[850px] z-[5] overflow-x-scroll">
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"ayz"}/>
                </div>
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"zessicajheng"}/>
                </div>
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"nicoli23"}/>
                </div>
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"nicoli23"}/>
                </div>
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"nicoli23"}/>
                </div>
                <div className="flex flex-col bg-blue-500 h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                    <TasksProfile name={"rahh"}/>
                </div>
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

    const storeModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        store modal
    </div>

    const musicModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        music modal
    </div>

    return <div>
        <SubToolBar cursorState={props.cursorState} setCursorState={props.setCursorState}/>
        <img src={store_icon} className="absolute w-[30px] h-[30px] bottom-[52.5px] right-[38.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]" onClick={() => {
            props.openModal(storeModal);
        }}/>
        <img src={music_icon} className="absolute w-[30px] h-[30px] bottom-[15px] right-[38.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]" onClick={() => {
            props.openModal(musicModal);
        }}/>
    </div>

}



const Room = (props) => {
    const navigate = useNavigate(); 
    const [cursorState, setCursorState] = useState("cursor"); // uh
    const [internalCurrentRoomID, setInternalCurrentRoomID] = useState(""); 
    // so we can force a rerender (to display join code) when we receive the roomid
    

    const openModal = (content) => {
        props.setModalOpen(true);
        props.setModalContent(content);
    }
    
    const closeModal = () => {
        props.setModalOpen(false);
        props.setModalContent(<></>);
    }

    const cursorMapper = {
        "cursor": "cursor-default",
        "pet": "cursor-wait",
        "laser": "cursor-s-resize",
        "camera": "cursor-crosshair",
    }

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if(props.currentRoomID != "") { 
            setInternalCurrentRoomID(props.currentRoomID);

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
            <ToolBar cursorState={cursorState} setCursorState={setCursorState} openModal={openModal} closeModal={closeModal}/>
            {(props.modalOpen && !props.sideBarOpen) && (<div className="absolute w-full h-full bg-slate-400 bg-opacity-40 z-[19]" onClick={closeModal}></div>)}
            <Modal visible={props.modalOpen} content={props.modalContent}/>
        </div>
    )
}

export default Room;

//bg-slate-400