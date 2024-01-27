import React, { useEffect, useRef, useState, useReducer, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";


import { Stage, Container } from '@pixi/react';
import { Texture } from 'pixi.js';

import { socket, handleUserTaskUpdate, keepAlive } from "../../client-socket.js";
import { post, get } from "../../utilities"; 
import { Modal, AchievementCard, Notification, BiscuitsNotification } from "../modules/util.js";
import { achievements, catAnimationDict, themeSurfaces } from "../modules/data.js";
import { MemoizedSprite } from "../modules/MemoizedSprite.js";

import back_icon from "../../assets/icons/back_icon.png";
import store_icon from "../../assets/icons/store_icon.png";
import music_icon from "../../assets/icons/music_icon.png";
import placeholder_pfp from "../../assets/placeholderpfp.png";
import close_icon from "../../assets/icons/close_icon.png";
import checkmark_icon from "../../assets/icons/checkmark_icon.png";
import plus_icon from "../../assets/icons/plus_icon.png";
import rightarrow_icon from "../../assets/icons/rightarrow_icon.png";
import x_icon from "../../assets/icons/x_icon.png";

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


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function log(num, base) {
    if (num != 0) {
        return (Math.log(num) / Math.log(base));
    } else if (num == 0) {
        return 0;
    }
}


const TasksProfile = (props) => { // takes in userObj
    const profileModal = <div className="flex flex-col items-center">
        <img src={close_icon} className="absolute left-[15px] top-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        <div className="h-[40px]">

        </div>
        <div className="flex flex-row mb-[7px]">
            <img src={props.userObj.user.pfp} className="w-[90px] h-[90px] mr-[20px]"/>
            <div className="flex flex-col">
                <div className="flex flex-row items-center mb-[5px]">
                    <div className="text-3xl font-bold mr-[2px]">
                        {props.userObj.user.name}
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <div className="mr-[2px]">
                        {props.userObj.user.bio}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center mb-[7px]">
            <div>
                stats
            </div>
            <div className="flex flex-row">
                <div className="mr-[7px]">
                    tasks finished: {props.userObj.user.tasksCompleted}
                </div>
                <div>
                    sessions completed: {props.userObj.user.sessionsCompleted}
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <div className="">
                achievements
            </div>
            <div className="flex flex-wrap justify-center">
                {props.userObj.user.achievements.map((userAchievement) => {
                    let achievement = achievements.filter((a) => {
                        return a.name == userAchievement;
                    });
                    //console.log(achievement);
                    if(achievement.length > 0) {
                        return (
                            <AchievementCard name={achievement[0].name} desc={achievement[0].desc} img={achievement[0].img} unlocked={true}/>
                        )
                    };
                })}
            </div>
        </div>
    </div>

    //console.log(`props userobj ${props.userObj.user}`);
    return <div className="flex justify-center items-center w-full h-[40px] mb-[10px] z-[5] text-xl candy-beans text-[#f5f5f5]">
        <img src={placeholder_pfp} className="w-[35px] h-auto mr-[10px]"/>
        <div onClick={() => {
            props.openModal(profileModal);
        }} className="hover:cursor-pointer hover:opacity-70">
            {props.userObj.user.name}
        </div>
    </div>
};

const OtherTaskListItem = (props) => { // props: content
    return (
        <div className="flex items-center pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5]" title={props.content}>
            <div className="border-white border-2 w-[250px] h-full overflow-hidden overflow-ellipsis whitespace-nowrap font-light simply-rounded text-[#212529]">
                {props.content}
            </div>  
        </div>
    )
};

const OtherTaskList = (props) => { // just used to display tasks (scroll on overflow); props: tasks; for everyone else
    return (
        <div className="w-full h-[160px] overflow-auto overflow-x-hidden z-[5]">
            {props.tasks.map((content) => (
                <OtherTaskListItem content={content}/>
            ))}
        </div>
    )
};

// props: userTasks, setUserTasks, userTasksCompleted, setUserTasksCompleted, content, idx
const UserTaskListItem = (props) => { 
    const removeItem = () => {
        //console.log(props.userTasks)
        const newArr = props.userTasks.filter((element, index) => {
            return index != props.idx;
        });
        props.setUserTasks(newArr);
        props.setUserTasksCompleted(props.userTasksCompleted + 1);
        let biscuitsEarned = Math.round(getRandomInt(7, 13) + log(props.userObj.user.tasksCompleted, 2.5) + log(props.userObj.user.sessionsCompleted, 2));
        props.updateUserObj({_id: props.userObj.user._id, inc: {biscuits: biscuitsEarned, tasksCompleted: 1}, append: "inc"});
        props.createBiscuitNotification(biscuitsEarned);
        
    };

    return (
        <div className="flex items-center justify-between pl-[10px] w-full h-[35px] rounded-lg mb-[5px] bg-white border-black border-4 z-[5]" title={props.content}>
            <div className="border-white border-2 w-[200px] h-full overflow-hidden overflow-ellipsis whitespace-nowrap font-light simply-rounded text-[#212529]">
                {props.content}
            </div>     
            <img src={checkmark_icon} className="h-[20px] w-[20px] mr-[10px] hover:cursor-pointer hover:opacity-75" onClick={removeItem}/>
        </div>
    );
};

const UserTaskList = (props) => { // props: userTasks, setUserTasks
    const [ editing, setEditing ] = useState(false);
    const newTask = useRef("");

    

    const handleEnterInInput = (e) => {
        if(e.key == 'Enter') {
            props.setUserTasks([newTask.current, ...props.userTasks]);
            newTask.current = "";
            setEditing(!editing);
        }
    };

    const handleBlur = (event) => {
        if (event.relatedTarget != null) {
            setEditing(!editing);
            console.log("blur firing?");
        }   
    }

    return (
        <div>
            { editing ?
                (
                <div onBlur={handleBlur} className="flex items-center justify-between pl-[10px] w-full h-[35px] rounded-lg mb-[5px] bg-[#E3E3E3] border-[#212529] border-4 z-[5]">
                <input autoFocus type="text" onKeyDown={handleEnterInInput} onChange={(event) => {
                    newTask.current = event.target.value;
                }}/>
                <img src={rightarrow_icon} className="h-[10px] w-[10px] mr-[10px] hover:cursor-pointer" onClick={() => {
                    props.setUserTasks([newTask.current, ...props.userTasks]);
                    newTask.current = "";
                    setEditing(!editing);
                }}/>
                </div>
                ) : (
                <div className="flex items-center justify-center pl-[5px] w-full h-[35px] rounded-lg mb-[5px] bg-[#E3E3E3] border-[#212529] border-4 z-[5] hover:cursor-pointer hover:opacity-85" onClick={() => {
                    setEditing(!editing);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="#212529" className="w-[15px] h-[15px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </div>
                )
            }
            <div className="w-full h-[120px]  overflow-auto overflow-x-hidden z-[5]">
                {props.userTasks.map((content, idx) => (
                    <UserTaskListItem createBiscuitNotification={props.createBiscuitNotification} updateAchievements={props.updateAchievements} userObj={props.userObj} updateUserObj={props.updateUserObj} userTasks={props.userTasks} setUserTasks={props.setUserTasks} userTasksCompleted={props.userTasksCompleted} setUserTasksCompleted={props.setUserTasksCompleted} content={content} idx={idx}/>
                ))}
            </div>
        </div>
    )
    
};

const Tasks = (props) => { // wtf
    const [ userTasks, setUserTasks ] = useState([]);
    const [ userTasksCompleted, setUserTasksCompleted ] = useState(0);
    const [ otherUserTasks, setOtherUserTasks] = useState([]); // array of userObjs; {username: "", tasks: []}
    const [ otherUserObjs, setOtherUserObjs ] = useState([]);

    setInterval(() => {

    }, []);

    useEffect(() => {
        handleUserTaskUpdate(userTasks, userTasksCompleted, props.currentRoomID);
        //console.log(`tasks completed: ${userTasksCompleted}`);
    }, [userTasks]);

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if((props.currentRoomID != "") && (props.currentRoomID != undefined)) { 
            props.setInternalCurrentRoomID(props.currentRoomID);

            socket.on(props.currentRoomID, (update) => { // rmb that server also emits user's userObj
                const userObjs = update.gameState.users.filter(e => e.username != update.username);
                //console.log(`ugh ${update.catUpdates}`);
                props.updateCanvasState(update.gameState.canvas.cats, update.gameState.canvas.theme);

                setOtherUserTasks(userObjs);

                //console.log(update.username);
                //console.log(update.gameState.canvas);

                
                
            });

            console.log(`client listening on ${props.currentRoomID}`);  
        }
    }, [props.currentRoomID]); 

    return <div className="absolute flex justify-between top-[51px] left-[50%] absolute-div-center-offset w-[95%] h-[235px] pl-[20px] pr-[20px] pb-[20px] z-[5]">
            <div className="flex h-full w-[275px] left-0 mr-[10px] mt-[13px] z-[5]">
                <div className="flex flex-col justify-between h-full w-[275px] z-[5]">
                    <TasksProfile userObj={props.userObj} openModal={props.openModal} closeModal={props.closeModal}/>
                    <UserTaskList updateCanvasState={props.updateCanvasState} createBiscuitNotification={props.createBiscuitNotification} updateAchievements={props.updateAchievements} userObj={props.userObj} updateUserObj={props.updateUserObj} userTasks={userTasks} setUserTasks={setUserTasks} userTasksCompleted={userTasksCompleted} setUserTasksCompleted={setUserTasksCompleted}/>
                </div>
            </div>
            <div className="flex flex-row h-full ml-[10px] min-w-[875px] w-[850px] mt-[13px] z-[5] overflow-x-scroll hide-scrollbar">
                {otherUserTasks.map((obj) => {
                    return (<div className="flex flex-col justify-between h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                        <TasksProfile userObj={obj.userObj} openModal={props.openModal} closeModal={props.closeModal}/>
                        <OtherTaskList userObj={props.userObj} tasks={obj.tasks}/>
                    </div>)
                })}
        </div>
    </div>
}



const ToolBar = (props) => {
    const [audioPlaying, setAudioPlaying] = useState(false);
    let audio;
    audio = new Audio("https://cdn.discordapp.com/attachments/754243466241769515/1200523017726468106/SPECIALZ.mp3");


    const toggleAudio = () => {
        console.log("does this run");
        setAudioPlaying(!audioPlaying);
    };

    useEffect(() => {
        console.log(audioPlaying);
        if(audioPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [audioPlaying]);

    const storeModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        store modal
    </div>

    const musicModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        <button onClick={toggleAudio} className="hover:opacity-65">
            you are my special 🗣️🗣️
        </button>
        
    </div>

    return <div>
        <svg onClick={() => {
            props.openModal(storeModal);
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f5f5f5" className="absolute w-[42.5px] h-[42.5px] bottom-[70px] right-[35.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
        <svg onClick={() => {
            props.openModal(musicModal);
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f5f5f5" className="absolute w-[42.5px] h-[42.5px] bottom-[15px] right-[35.75px] hover:opacity-[0.75] hover:cursor-pointer z-[5]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
        </svg>
    </div>

}

const compareProps = (oldProps, newProps) => {
  // TODO for wnv: impl this (hint not length, need to deep compare equality of each obj in props.animatedSprites + compare theme)
  // then figure out why memoizedsprites aren't loading
  // 
}

// idt memo does anything here??? 
// fallback: define five memoized animatedsprites and j pass in data like that
// (wouldn't update same values bc new cats are appended to catUpdates obj on backend)
const PixiCanvas = memo((props) => { // takes in animatedSprites, theme
    // TODO: process catUpdates
    // turn into array of objs each containing texture arrays, x, y
    if (props.animatedSprites) {
        //console.log(props.animatedSprites);
    };

    const testTextures = [
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199658754052988938/comet_sitting.png"),
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"),
    ]

    return (
        <Stage className="absolute bottom-0 left-0 right-0 ml-auto mr-auto z-0 cafe-mockup-bg" width={1200} height={250} options={{ backgroundAlpha: 0 }}>
            <Container position={[600, 125]}>
                {props.animatedSprites.length >= 1 ? (<MemoizedSprite textures={props.animatedSprites[0].textures} x={props.animatedSprites[0].x} y={props.animatedSprites[0].y}/>) : (<></>)}
                {props.animatedSprites.length >= 2 ? (<MemoizedSprite textures={props.animatedSprites[1].textures} x={props.animatedSprites[1].x} y={props.animatedSprites[1].y}/>) : (<></>)}
                {props.animatedSprites.length >= 3 ? (<MemoizedSprite textures={props.animatedSprites[2].textures} x={props.animatedSprites[2].x} y={props.animatedSprites[2].y}/>) : (<></>)}
                {props.animatedSprites.length >= 4 ? (<MemoizedSprite textures={props.animatedSprites[3].textures} x={props.animatedSprites[3].x} y={props.animatedSprites[3].y}/>) : (<></>)}
                {props.animatedSprites.length >= 5 ? (<MemoizedSprite textures={props.animatedSprites[4].textures} x={props.animatedSprites[4].x} y={props.animatedSprites[4].y}/>) : (<></>)}       
            </Container>
        </Stage>
    );
}, compareProps);




const Room = (props) => {
    const navigate = useNavigate(); 
    const [internalCurrentRoomID, setInternalCurrentRoomID] = useState(""); 
    // so we can force a rerender (to display join code) when we receive the roomid

    



    useEffect(() => {
        if(internalCurrentRoomID != "") {
            console.log(internalCurrentRoomID);
        }
        setInterval(() => {
            keepAlive(internalCurrentRoomID);
        }, 1000);
    }, [internalCurrentRoomID]);    

    const openModal = (content) => {
        props.setModalOpen(true);
        props.setModalContent(content);
    };
    
    const closeModal = () => {
        props.setModalOpen(false);
        props.setModalContent(<></>);
    };

    const [animatedSprites, setAnimatedSprites] = useState([]); 
    // TODO: needs to be reset when leaving room
    const [theme, setTheme] = useState("cafe"); // don't reset this, gets set when joining room

    const updateCanvasState = (cats, theme) => { // canvas dims are 1200 x 250; receives update.gameState.canvas
        // TODO: memoize + use array.map to generate AnimatedSprites instead (here !!)
        //console.log(animatedSprites);
        let spriteObjs = cats.map((cat) => {
            let xPos = themeSurfaces[theme][cat.position].x;
            let yPos = themeSurfaces[theme][cat.position].y;
            let textures = catAnimationDict[cat.name][cat.state].map((t) => {
                return Texture.from(t);
            });
        
        return {
            textures: textures, // for now
            x: xPos,
            y: yPos,
        };

      });
    
        setAnimatedSprites([...animatedSprites, spriteObjs]);

        
        // holyy shit im losing it rn
        setTheme(theme);
      };


    
    
    

    return (
        <div className={`absolute flex flex-col h-full w-full bg-[#232023] overflow-hidden`}>
            <PixiCanvas theme={theme} animatedSprites={animatedSprites}/>
            <Tasks updateCanvasState={updateCanvasState} createBiscuitNotification={props.createBiscuitNotification} updateAchievements={props.updateAchievements} openModal={openModal} closeModal={closeModal} userObj={props.userObj} updateUserObj={props.updateUserObj} setInternalCurrentRoomID={setInternalCurrentRoomID} currentRoomID={props.currentRoomID}/> 
            <ToolBar userObj={props.userObj} openModal={openModal} closeModal={closeModal}/>
            {(props.modalOpen && !props.sideBarOpen) && (<div className="absolute w-full h-full centered-abs-xy bg-black bg-opacity-20 z-[19]" onClick={closeModal}></div>)}
            <Modal width={600} height={350} visible={props.modalOpen} content={props.modalContent}/>
            <Notification notificationOpen={props.notificationOpen} header={props.notificationContent.header} body={props.notificationContent.body} img={props.notificationContent.img}/>
            <BiscuitsNotification biscuits={props.biscuitsJustEarned} visible={props.biscuitNotifVisible}/>
        </div>
    )
}

export default Room;