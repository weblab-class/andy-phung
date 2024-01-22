import React, { useEffect, useRef, useState, useReducer, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import { socket, handleUserTaskUpdate } from "../../client-socket.js";
import { post } from "../../utilities"; 
import { Modal } from "../modules/util.js";

import { drawCanvas } from "../../canvasManager";

import back_icon from "../../assets/icons/back_icon.png";
import store_icon from "../../assets/icons/store_icon.png";
import music_icon from "../../assets/icons/music_icon.png";
import placeholder_pfp from "../../assets/placeholderpfp.png";
import close_icon from "../../assets/icons/close_icon.png";
import checkmark_icon from "../../assets/icons/checkmark_icon.png";
import plus_icon from "../../assets/icons/plus_icon.png";
import rightarrow_icon from "../../assets/icons/rightarrow_icon.png";

// lmaoo what is this

/*
TODO:
- pixijs canvas on z-0
- tasks on z-5
*/

/*
- update (for now) to server is: cursor position, whether clicking or not, user tasks
- server returns sprite positions (toys, cats), links to sprites, other users' tasks; 
if moving a toy, also returns position of "ghost" of toy on backdrop surface (just one line for now)
*/

const TasksProfile = (props) => {
    return <div className="flex justify-center items-center w-full h-[40px] mb-[10px] z-[5]">
        <img src={placeholder_pfp} className="w-[35px] h-auto mr-[10px]"/>
        {props.name}
    </div>
};

const OtherTaskListItem = (props) => { // props: content
    return (
        <div className="flex items-center pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5]">
            {props.content}
        </div>
    )
};

const OtherTaskList = (props) => { // just used to display tasks (scroll on overflow); props: tasks; for everyone else
    return (
        <div className="w-full h-[160px] bg-slate-200 overflow-scroll overflow-x-hidden z-[5]">
            {props.tasks.map((content) => (
                <OtherTaskListItem content={content}/>
            ))}
        </div>
    )
};

const UserTaskListItem = (props) => { // props: userTasks, setUserTasks, content, idx
    const removeItem = () => {
        console.log(props.userTasks)
        const newArr = props.userTasks.filter((element, index) => {
            return index != props.idx;
        });
        props.setUserTasks(newArr);
    };

    return (
        <div className="flex items-center justify-between pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5]">
            {props.content} 
            <img src={checkmark_icon} className="h-[20px] w-[20px] mr-[10px] hover:cursor-pointer hover:opacity-75" onClick={removeItem}/>
        </div>
    );
};

const UserTaskList = (props) => { // props: userTasks, setUserTasks
    const [ editing, setEditing ] = useState(false);
    const newTask = useRef("");

    return (
        <div>
            { editing ?
                (<div className="flex items-center justify-between pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5]">
                <input type="text" onChange={(event) => {
                    newTask.current = event.target.value;
                }}/>
                <img src={rightarrow_icon} className="h-[10px] w-[10px] mr-[10px] hover:cursor-pointer" onClick={() => {
                    props.setUserTasks([newTask.current, ...props.userTasks]);
                    newTask.current = "";
                    setEditing(!editing);
                }}/>
                </div>
                ) : (
                <div className="flex items-center justify-center pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5] hover:cursor-pointer hover:opacity-75" onClick={() => {
                    setEditing(!editing);
                }}>
                    <img src={plus_icon} className="h-[10px] w-[10px]"/>
                </div>
                )
            }
            <div className="w-full h-[120px]  overflow-scroll overflow-x-hidden z-[5]">
                {props.userTasks.map((content, idx) => (
                    <UserTaskListItem userTasks={props.userTasks} setUserTasks={props.setUserTasks} content={content} idx={idx}/>
                ))}
            </div>
        </div>
    )
    
};

const Tasks = (props) => { // wtf
    const [ userTasks, setUserTasks ] = useState([]);
    const [ username, setUsername ] = useState(""); // TODO: remove once rest of api implemented
    const [ otherUserTasks, setOtherUserTasks] = useState([]); // array of userObjs; {username: "", tasks: []}

    useEffect(() => {
        handleUserTaskUpdate(userTasks, props.currentRoomID);
    }, [userTasks]);

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if((props.currentRoomID != "") && (props.currentRoomID != undefined)) { 
            props.setInternalCurrentRoomID(props.currentRoomID);

            socket.on(props.currentRoomID, (update) => { // rmb that server also emits user's userObj
                const userObjs = update.gameState.users.filter(e => e.username != update.username);
                setOtherUserTasks(userObjs);
                setUsername(update.username);
                console.log(update.username);
                console.log(userObjs);
            });

            console.log(`client listening on ${props.currentRoomID}`);  
        }
    }, [props.currentRoomID]); 

    return <div className="absolute flex justify-between top-[51px] left-[50%] absolute-div-center-offset w-[95%] h-[235px] pl-[20px] pr-[20px] pb-[20px] z-[5]">
            <div className="flex h-full w-[275px] left-0 mr-[10px] mt-[13px] z-[5]">
                <div className="flex flex-col justify-between h-full w-[275px] z-[5]">
                    <TasksProfile name={username}/>
                    <UserTaskList userTasks={userTasks} setUserTasks={setUserTasks}/>
                </div>
            </div>
            <div className="flex flex-row h-full ml-[10px] min-w-[875px] w-[850px] mt-[13px] z-[5] overflow-x-scroll hide-scrollbar">
                {otherUserTasks.map((obj) => {
                    return (<div className="flex flex-col justify-between h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                        <TasksProfile name={obj.username}/>
                        <OtherTaskList tasks={obj.tasks}/>
                    </div>)
                })}
                
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
        <img src={store_icon} className="absolute w-[42.5px] h-[42.5px] bottom-[65px] right-[35.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]" onClick={() => {
            props.openModal(storeModal);
        }}/>
        <img src={music_icon} className="absolute w-[42.5px] h-[42.5px] bottom-[15px] right-[35.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]" onClick={() => {
            props.openModal(musicModal);
        }}/>
    </div>

}




const Room = (props) => {
    const navigate = useNavigate(); 
    const [internalCurrentRoomID, setInternalCurrentRoomID] = useState(""); 
    // so we can force a rerender (to display join code) when we receive the roomid

    const refCanvas = useRef(null) // so we can start rendering after everything loaded?
    

    const openModal = (content) => {
        props.setModalOpen(true);
        props.setModalContent(content);
    }
    
    const closeModal = () => {
        props.setModalOpen(false);
        props.setModalContent(<></>);
    }

    

    useEffect(() => {
        setInterval(() => {
            drawCanvas({});
        }, 1000);
    }, [refCanvas]);


    return (
        <div className={`flex flex-col h-full w-full`}>
            <div className="h-full w-full z-0">
                <canvas ref={refCanvas} id="game-canvas" width={1200} height={250} className="absolute bottom-0 left-0 right-0 ml-auto mr-auto border-red-400 border-4 z-0"/>
            </div>
            <img src={back_icon} width="30px" height="30px" className="absolute cursor-pointer z-[5]" onClick={() => {
                post("/api/leaveroom", { roomid: props.currentRoomID });
                props.setCurrentRoomID("");
                navigate("/join");
            }}/>
            <Tasks setInternalCurrentRoomID={setInternalCurrentRoomID} currentRoomID={props.currentRoomID}/> 
            <ToolBar openModal={openModal} closeModal={closeModal}/>
            {(props.modalOpen && !props.sideBarOpen) && (<div className="absolute w-full h-full bg-slate-400 bg-opacity-40 z-[19]" onClick={closeModal}></div>)}
            <Modal visible={props.modalOpen} content={props.modalContent}/>
            
        </div>
    )
}

export default Room;

//bg-slate-400