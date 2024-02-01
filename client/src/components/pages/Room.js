import React, { useEffect, useRef, useState, useReducer, useMemo, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { socket, handleUserTaskUpdate, keepAlive } from "../../client-socket.js";
import { post, get } from "../../utilities"; 

import { updateCanvasState, drawToyPlaceAreas, clearToyPlaceAreas, drawToy, convertCoord } from "../../canvasManager.js";
import { Modal, AchievementCard, Notification, BiscuitsNotification, CatCard } from "../modules/util.js";
import { achievements, themeSurfaces, cats, storeItems } from "../modules/data.js";
import { catAnimationDict, } from "../modules/animations.js";

import back_icon from "../../assets/icons/back_icon.png";
import store_icon from "../../assets/icons/store_icon.png";
import music_icon from "../../assets/icons/music_icon.png";
import placeholder_pfp from "../../assets/placeholderpfp.png";
import close_icon from "../../assets/icons/close_icon.png";
import checkmark_icon from "../../assets/icons/checkmark_icon.png";
import plus_icon from "../../assets/icons/plus_icon.png";
import rightarrow_icon from "../../assets/icons/rightarrow_icon.png";
import x_icon from "../../assets/icons/x_icon.png";
import biscuit_icon from "../../assets/icons/biscuit_icon.png";
import fire from "../../assets/fire_gif.gif";
import boombox from "../../assets/boombox.png";

const svgclr = "#6A5239";

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
    let catlist = [];
    for (const [name, value] of Object.entries(cats)) {
        catlist.push({
            name: name,
            personality: value.personality,
            attribution: value.attribution,
            rare: value.rare,
        });
    };

    const profileModal = <div className="flex flex-col items-center justify-center">
    <svg onClick={props.closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} className="w-[35px] h-[35px] absolute left-[15px] top-[15px] hover:opacity-75 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

    <div id="brown-scrollbar" className="flex flex-col items-center h-[342px] w-full overflow-auto">
        <div className="flex flex-row mt-[40px] mb-[20px] justify-center">
            <div id="pfp-container">
                <img src={props.userObj.user.pfp} className="w-[105px] h-[105px] mr-[20px] border-clr border-[6px] rounded-full"/>
            </div>

            <div className="flex flex-col" id="name-bio-container">
                <div className="flex flex-row items-center mb-[5px]">
                    <div className="text-4xl font-semibold simply-rounded text-clr mr-[2px]">
                        {props.userObj.user.name}
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <div className="mr-[2px] simply-rounded text-clr text-lg">
                        {props.userObj.user.bio}
                    </div>
                </div>
            </div>
        </div>
        <div id="divider" className="mt-[5px] mb-[5px] w-[85%] border-b-4 border-clr opacity-40">
        </div>
        <div className="w-full flex flex-col items-center mb-[7px]">
            <div className="text-2xl text-clr simply-rounded font-bold">
                ~ stats ~
            </div>
            <div className="w-full flex flex-row justify-between flex-nowrap">
                <div className="ml-[67px] text-clr simply-rounded text-xl font-light">
                    tasks finished: {props.userObj.user.tasksCompleted}
                </div>
                <div className="mr-[67px] text-clr simply-rounded text-xl font-light">
                    sessions completed: {props.userObj.user.sessionsCompleted}
                </div>
            </div>
        </div>
        <div id="divider" className="mt-[5px] mb-[5px] w-[85%] border-b-4 border-clr opacity-40">
        </div>
        <div className="flex flex-col items-center">
            <div className="text-2xl text-clr simply-rounded font-bold">
                ~ cats seen ~
            </div>
            <div className="flex flex-wrap justify-center">
                {
                    catlist.map((cat) => {
                        if(props.userObj.user.catsSeen.filter((c) => c == cat.name).length > 0) {
                            return (
                                <CatCard name={cat.name} personality={cat.personality} attribution={cat.attribution} rare={cat.rare} img={catAnimationDict[cat.name]["standing"][0]} unlocked={true}/>
                            )
                        }
                    })
                }
                
            </div>
        </div>
        <div id="divider" className="mt-[5px] mb-[5px] w-[85%] border-b-4 border-clr opacity-40">
        </div>
        <div className="flex flex-col items-center">
            <div className="text-2xl text-clr simply-rounded font-bold">
                ~ achievements ~
            </div>
            <div className="flex flex-wrap justify-center">
                {
                    achievements.map((achievement) => {
                        if(props.userObj.user.achievements.filter((a) => a == achievement.name).length > 0) {
                            return (
                                <AchievementCard name={achievement.name} desc={achievement.desc} img={achievement.img} unlocked={true}/>
                            )
                        }
                    })
                }
                
            </div>
        </div>
    </div>
</div>

    //console.log(`props userobj ${props.userObj.user}`);
    return <div className="flex justify-center items-center w-full h-[40px] mb-[10px] z-[5] text-xl candy-beans text-[#f5f5f5]">
        <img src={props.userObj.user.pfp} className="w-[40px] h-[40px] border-transparent border-2 rounded-full mr-[10px]"/>
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
        <div id="gray-scrollbar" className="w-full h-[160px] overflow-auto overflow-x-hidden z-[5]">
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
        let biscuitsEarned = Math.round(getRandomInt(3, 7) + log(props.userObj.user.tasksCompleted, 2.5) + log(props.userObj.user.sessionsCompleted, 2));
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
        if (event.relatedTarget == null) {
            setEditing(!editing);
            console.log("blur firing?");
        }   
    }

    return (
        <div>
            { editing ?
                (
                <div tabIndex="-1" className="flex items-center justify-between pl-[10px] w-full h-[35px] rounded-lg mb-[5px] bg-[#E3E3E3] border-[#212529] border-4 z-[5]">
                <input autoFocus onBlur={handleBlur} placeholder="enter a task here!" type="text" onKeyDown={handleEnterInInput} onChange={(event) => {
                    newTask.current = event.target.value;
                }}/>
                <img tabIndex="0" src={rightarrow_icon} className="h-[10px] w-[10px] mr-[10px] hover:cursor-pointer hover:opacity-75" onClick={() => {
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
            <div id="gray-scrollbar" className="w-full h-[120px]  overflow-auto overflow-x-hidden z-[5]">
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

    useEffect(() => {
        //console.log("runs");
    }, [props.roomState])

    useEffect(() => {
        handleUserTaskUpdate(userTasks, userTasksCompleted, props.currentRoomID);
        //console.log(`tasks completed: ${userTasksCompleted}`);
    }, [userTasks]);

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if((props.currentRoomID != "") && (props.currentRoomID != undefined)) { 
            props.setInternalCurrentRoomID(props.currentRoomID);

            socket.on(props.currentRoomID, (update) => { // rmb that server also emits user's userObj
                try {
                    //console.log(update.gameState.canvas.cats);
                    const userObjs = update.gameState.users.filter(e => e.username != update.username);
                    updateCanvasState(update.gameState.canvas, update.gameState.frame, update.catUpdates);
                    setOtherUserTasks(userObjs);

                    if(props.theme != update.gameState.canvas.theme) {
                        props.setTheme(update.gameState.canvas.theme);
                    }

                    props.roomState.current = update.gameState.canvas;
                    
                    if(update.catUpdates.filter((c) => c.from == "").length > 0) {
                        //console.log("yeah?");
                        update.catUpdates.forEach((c) => {
                            if(c.from == "" && !props.userObj.user.catsSeen.includes(c.name)) { // if new spawn and haven't seen yet
                                //console.log("yeah????");
                                props.updateUserObj({_id: props.userObj.user._id, push: {catsSeen: c.name}, append: "push"});
                            }
                        })
                    }
                } catch {
                    console.log("error occurred server -> client");
                }
            });

            //console.log(`client listening on ${props.currentRoomID}`);  
        }
    }, [props.currentRoomID]); 

    return <div className="absolute flex justify-start top-[51px] left-[50%] absolute-div-center-offset w-[95%] h-[235px] pl-[20px] pr-[20px] pb-[20px] z-[5]">
            <div className="flex h-full w-[275px] left-0 mr-[20px] mt-[13px] z-[5]">
                <div className="flex flex-col justify-between h-full w-[275px] z-[5]">
                    <TasksProfile userObj={props.userObj} openModal={props.openModal} closeModal={props.closeModal}/>
                    <UserTaskList createBiscuitNotification={props.createBiscuitNotification} updateAchievements={props.updateAchievements} userObj={props.userObj} updateUserObj={props.updateUserObj} userTasks={userTasks} setUserTasks={setUserTasks} userTasksCompleted={userTasksCompleted} setUserTasksCompleted={setUserTasksCompleted}/>
                </div>
            </div>
            <div className="flex flex-row h-full ml-[10px] min-w-[875px] w-[60%] mt-[13px] z-[5] overflow-x-scroll" id="gray-scrollbar">
                {otherUserTasks.map((obj) => {
                    return (<div className="flex flex-col justify-between h-full min-w-[275px] w-[275px] z-[5] mr-[15px]">
                        <TasksProfile userObj={obj.userObj} openModal={props.openModal} closeModal={props.closeModal}/>
                        <OtherTaskList userObj={props.userObj} tasks={obj.tasks}/>
                    </div>)
                })}
        </div>
    </div>
}

const ApricityStoreItem = (props) => {
    return (
        <div className="p-[2px] flex flex-col justify-center items-center h-[130px] w-[130px] border-[#694F31] border-4 rounded-xl bg-clr-one">
            <div className="text-sm w-full border-[#694F31] text-center font-medium simply-rounded text-[#694F31]">
                {props.item.name}
            </div>
            <div className="text-xxs font-extralight simply-rounded text-[#694F31]">
                {props.item.attribution}
            </div>
            <img src={props.item.img} className="mt-[7px] mb-[7px] w-[40px] h-[40px]"/>
            {props.userObj.user.toysBought.includes(props.item.name) ? (
                <div className="flex flex-nowrap justify-center w-[100px] items-center border-[#694F31] border-2 rounded-lg bg-[#d7a46b]">
                    <div className="text-sm font-medium simply-rounded text-[#694F31]">
                        Bought!
                    </div>
                </div>
            ) : (
                <div onClick={() => {props.buyItem(props.item.name, props.item.price)} } className="flex flex-nowrap justify-center w-[100px] items-center border-[#694F31] border-2 rounded-lg hover:cursor-pointer bg-[#DEB484] hover:bg-[#DBAC78]">
                    <img src={biscuit_icon} className="w-[18px] h-[18px] mr-[3px]"/>
                    <div className="text-sm font-medium simply-rounded text-[#694F31]">
                        {props.item.price}
                    </div>
                </div>
            )}
            
            
        </div>
    )
}

const StoreItem = (props) => {
    return (
        <div className="p-[2px] flex flex-col justify-center items-center h-[130px] w-[130px] border-[#694F31] border-4 rounded-xl bg-clr-one">
            <div className="text-sm w-full border-[#694F31] text-center font-medium simply-rounded text-[#694F31]">
                {props.item.name}
            </div>
            <div className="text-xxs font-extralight simply-rounded text-[#694F31]">
                {props.item.attribution}
            </div>
            <img src={props.item.img} className="mt-[7px] mb-[7px] w-[40px] h-[40px]"/>
            {props.userObj.user.toysBought.includes(props.item.name) ? (
                <div onClick={() => {props.startToyPlace(props.item.name)}} className="flex flex-nowrap justify-center w-[100px] items-center border-[#694F31] border-2 rounded-lg hover:cursor-pointer bg-[#d7a46b] hover:bg-[#CE9C63]">
                    <div className="text-sm font-medium simply-rounded text-[#694F31]">
                        Place
                    </div>
                </div>
            ) : (
                <div onClick={() => {props.buyItem(props.item.name, props.item.price)} } className="flex flex-nowrap justify-center w-[100px] items-center border-[#694F31] border-2 rounded-lg hover:cursor-pointer bg-[#DEB484] hover:bg-[#DBAC78]">
                    <img src={biscuit_icon} className="w-[18px] h-[18px] mr-[3px]"/>
                    <div className="text-sm font-medium simply-rounded text-[#694F31]">
                        {props.item.price}
                    </div>
                </div>
            )}
            
            
        </div>
    )
}

const ToolBar = (props) => {
    const [storePage, setStorePage] = useState(0);
    const [itemBoughtFlag, setItemBoughtFlag] = useState(false);

    const pages = Math.ceil(storeItems.length/6)-1;

    const buyItem = (name, biscuits) => {
        if(props.userObj.user.biscuits >= biscuits) { // holy fuckk i almost forgot this -andy 14 minutes before the deadline
            props.updateUserObj({_id: props.userObj.user._id, push: {toysBought: name}, append: "push"});
            props.updateUserObj({_id: props.userObj.user._id, inc: {biscuits: -1*biscuits}, append: "inc"});
            setItemBoughtFlag(!itemBoughtFlag);
        };
    };
    

    const nextTrack = () => {
        props.audioTrackNumber == props.audioTracks.length - 1 ? props.setAudioTrackNumber(0) : props.setAudioTrackNumber(props.audioTrackNumber + 1);
    };

    const prevTrack = () => {
        props.audioTrackNumber == 0 ? props.setAudioTrackNumber(props.audioTracks.length - 1) : props.setAudioTrackNumber(props.audioTrackNumber - 1)
    }
    
    const storeModal = <div className="w-full h-full flex flex-col items-center ">
        <svg onClick={props.closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} className="w-[35px] h-[35px] absolute left-[15px] top-[15px] hover:opacity-75 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="simply-rounded text-2xl text-clr">
                store!
            </div>
            <div className="simply-rounded text-xxs text-clr">
                {"all drawings stolen from canva <3"}
            </div>
            <div className="mt-[5px] w-full h-auto flex flex-row flex-nowrap justify-center items-center">
                {storePage > 0 ? (
                    <svg onClick={() => {
                        setStorePage(storePage-1);
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#694F31" class="w-[36px] h-[36px] hover:opacity-75 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                ) : ( // not visible, prevents content from shifting
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#694F31" class="w-[36px] h-[36px] opacity-0">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                )}
                <div className="ml-[10px] mr-[10px] flex flex-row flex-wrap w-[420px] h-[270px] justify-between content-between">
                    {storePage < pages ? storeItems.slice(storePage*6, storePage*6+6).map((i) => {
                        return i.name != "Apricity (Theme)" ? (<StoreItem item={i} userObj={props.userObj} updateUserObj={props.updateUserObj} buyItem={buyItem} startToyPlace={props.startToyPlace}/>) : (
                            <ApricityStoreItem item={i} userObj={props.userObj} updateUserObj={props.updateUserObj} buyItem={buyItem} startToyPlace={props.startToyPlace}/>
                        )
                    }) : storeItems.slice(storePage*6, storeItems.length).map((i) => {
                        return i.name != "Apricity (Theme)" ? (<StoreItem item={i} userObj={props.userObj} updateUserObj={props.updateUserObj} buyItem={buyItem} startToyPlace={props.startToyPlace}/>) : (
                            <ApricityStoreItem item={i} userObj={props.userObj} updateUserObj={props.updateUserObj} buyItem={buyItem} startToyPlace={props.startToyPlace}/>
                        )
                    })}
                </div>
                {storePage < pages ? (
                    <svg onClick={() => {
                        setStorePage(storePage+1);
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#694F31" class="w-[36px] h-[36px] hover:opacity-75 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#694F31" class="w-[36px] h-[36px] opacity-0">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                )}
            </div>
        </div>
    </div>

    const musicModal = <div className="flex flex-col items-center">
        <svg onClick={props.closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} className="w-[35px] h-[35px] absolute left-[15px] top-[15px] hover:opacity-75 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <img src={boombox} className="w-[391px] h-[240px] mt-[30px] mb-[10px]"/>
        <div className="flex flex-row flex-nowrap items-center">
            <svg onClick={prevTrack} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} className="w-8 h-8 hover:cursor-pointer hover:opacity-65 mr-[7px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <div className="text-xl simply-rounded text-clr w-[190px] text-center">
                {props.audioTracks[props.audioTrackNumber].name}
            </div>
            <svg onClick={nextTrack} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke={svgclr} className="w-8 h-8 hover:cursor-pointer hover:opacity-65 ml-[7px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

        </div>
        
        
        
    </div>
    
    useEffect(() => {
        if(props.modalOpen) {
            props.openModal(musicModal);
        }
    }, [props.audioTrackNumber]);

    useEffect(() => { // ugh
        if(props.modalOpen) {
            props.openModal(storeModal);
        }
    }, [storePage]);

    useEffect(() => { // ugh
        if(props.modalOpen) {
            props.openModal(storeModal);
        }
    }, [itemBoughtFlag, props.userObj.user.biscuits]);


    
    

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

const Canvas = (props) => { // takes in theme; TODO: set bg based on theme
    const [hoverCursor, setHoverCursor] = useState(false);

    const getMousePos = (canvas, evt) => {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    };

    const changeCursor = (evt) => {
        let canvas = document.getElementById("toy-canvas");
        if(props.placingToy) {
            let mousePosX = getMousePos(canvas, evt).x;
            let mousePosY = getMousePos(canvas, evt).y;

            //console.log(`cursor at ${mousePosX}, ${mousePosY}`);

            let bboxes = props.roomState.current.surfaces.map((location) => {
                let { drawX, drawY } = convertCoord(location.x, location.y);


                return [drawX - props.rectDimX/2, drawX + props.rectDimX/2, drawY - props.rectDimY/2, drawY + props.rectDimY/2, 
                {
                    x: drawX,
                    y: drawY, 
                    rectDimX: props.rectDimX, 
                    rectDimY: props.rectDimY
                }]; // (canvas coords) x left, x right, y upper, y lower
            });
            //console.log(bboxes);

            for (const bbox of bboxes) {
                if(mousePosX >= bbox[0] && bbox[1] >= mousePosX && mousePosY >= bbox[2] && bbox[3] >= mousePosY) {
                    setHoverCursor(true);
                    break;
                } else {
                    setHoverCursor(false);
                };
            };
        };
    };

    const placeToy = (evt) => {
        let canvas = document.getElementById("toy-canvas");

        if(props.placingToy) {
            let mousePosX = getMousePos(canvas, evt).x;
            let mousePosY = getMousePos(canvas, evt).y;

            //console.log(`cursor at ${mousePosX}, ${mousePosY}`);

            let bboxes = props.roomState.current.surfaces.map((location) => {
                let { drawX, drawY } = convertCoord(location.x, location.y);


                return [drawX - props.rectDimX/2, drawX + props.rectDimX/2, drawY - props.rectDimY/2, drawY + props.rectDimY/2, 
                {
                    x: drawX,
                    y: drawY, 
                    rectDimX: props.rectDimX, 
                    rectDimY: props.rectDimY
                }]; // (canvas coords) x left, x right, y upper, y lower
            });
            //console.log(bboxes);

            bboxes.forEach((bbox) => {
                if(mousePosX >= bbox[0] && bbox[1] >= mousePosX && mousePosY >= bbox[2] && bbox[3] >= mousePosY) {
                    drawToy(props.toyBeingPlaced, bbox[4]);
                    setHoverCursor(false);
                };
            });
            

            //console.log(`${}, ${getMousePos(canvas, evt).y}`);

            // use mouse position inside canvas (???) to call drawToy
            // props.rectDimX, props.rectDimY

            // w props.toyBeingPlaced
            props.endToyPlace();
            // also need hover interaction for toy place squares
            // click anywhere else to not place toy
        }
    };

    return (
        <>
        <canvas onClick={placeToy} onMouseMove={changeCursor} id="toy-place-canvas" width={1200} height={250} className={`absolute bottom-0 left-0 right-0 ml-auto mr-auto z-[4] ${hoverCursor ? "cursor-pointer" : "cursor-default"}`}/>
        <canvas id="toy-canvas" width={1200} height={250} className="absolute bottom-0 left-0 right-0 ml-auto mr-auto z-[3]"/>     
        <div className="w-[1200px] h-[250px] absolute bottom-0 left-0 right-0 ml-auto mr-auto z-[1]">
            <img src={fire} width={35} height={35} className="absolute bottom-[44px] left-[110px] right-0 ml-auto mr-auto z-[2]"/>
            <canvas id="game-canvas" width={1200} height={250} className="cafe-mockup-bg z-[1]"/>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 ml-auto mr-auto w-full h-[470px] z-[0] cafe-skyscrapers-bg">

        </div>
        </>
        
    )
}

const Room = (props) => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [internalCurrentRoomID, setInternalCurrentRoomID] = useState(""); 
    // so we can force a rerender (to display join code) when we receive the roomid
    const audioTracks = [ 
        {
            name: "animal crossing lofi 1",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202044174774583318/Animal_Crossing__New_Horizons_-_5AM_Lofi_Lia_Remix.mp3",
        },
        {
            name: "animal crossing lofi 2",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202044175109857300/animal_crossing_lofi_new_horizons.mp3",
        },
        {
            name: "animal crossing lofi 3",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202044174455808070/Animal_Crossing_New_Leaf_-_8PM_Lofi_Lia_Remix.mp3",
        },
        {
            name: "soundcloud lofi 1",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202044175420493866/Copyright_Locked_Chill_Lofi_Hiphop_-_Kimochi_by_FrkA2.mp3",
        },
        {
            name: "my one and only bsf",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202044174078054440/Ao_no_Sumika_Jujutsu_Kaisen_Season_2_Opening_but_its_lofi_hip_hop.mp3",
        },
        {
            name: "u r my special 🗣️🗣️",
            link: "https://cdn.discordapp.com/attachments/1201919002264490034/1202461676763480064/SPECIALZ_-_Jujutsu_KaisenLofi_Remix.mp3",
        },
    ];

    const [audioTrackNumber, setAudioTrackNumber] = useState(0);
    const audioRef = useRef();

    const sfxRef = useRef();


    const [placingToy, setPlacingToy] = useState(false);
    const [toyBeingPlaced, setToyBeingPlaced] = useState("");

    const roomState = useRef(); // updated w gameState.canvas

    let rectDimX = 80; // bounding boxes for placing toys
    let rectDimY = 60;

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current.volume = props.userObj.user.musicVolume / 100;
        audioRef.current.play().catch(() => {
            console.log("audio play failed"); 
        });
        audioRef.current.loop = true;
    }, [audioTrackNumber, props.userObj.user.musicVolume]);

    useEffect(() => {
        sfxRef.current.volume = props.userObj.user.sfxVolume / 100;
        sfxRef.current.loop = true;
    }, [props.userObj.user.sfxVolume]);

    useEffect(() => {
        sfxRef.current.play().catch(() => {
            console.log("audio play failed");
        });
    }, [])

    useEffect(() => {
        if(internalCurrentRoomID != "") {
            console.log(internalCurrentRoomID);
        }
        setInterval(() => {
            keepAlive(internalCurrentRoomID);
        }, 5000);
    }, [internalCurrentRoomID]);    

    const openModal = (content) => {
        props.setModalOpen(true);
        props.setModalContent(content);
    };
    
    const closeModal = () => {
        props.setModalOpen(false);
        props.setModalContent(<></>);
    };

    const startToyPlace = (toy) => {
        closeModal();
        setPlacingToy(true);
        setToyBeingPlaced(toy);
        drawToyPlaceAreas(roomState.current, rectDimX, rectDimY);
    }

    const endToyPlace = () => {
        setPlacingToy(false);
        setToyBeingPlaced("");
        clearToyPlaceAreas();
    };

    useEffect(() => {
        get("/api/whoami").then((user) => {
            get("/api/inaroom").then((res) => {
                if(!res.roomid) {
                    navigate("/join");
                }
            })
        })
    }, [props.currentRoomID]);
    
    return (
        <div className={`absolute flex flex-col h-full w-full cafe-sky-bg overflow-hidden`}>
            <Canvas rectDimX={rectDimX} rectDimY={rectDimY} placingToy={placingToy} toyBeingPlaced={toyBeingPlaced} endToyPlace={endToyPlace} theme={props.theme} roomState={roomState}/>
            <Tasks roomState={roomState} theme={props.theme} setTheme={props.setTheme} createBiscuitNotification={props.createBiscuitNotification} updateAchievements={props.updateAchievements} openModal={openModal} closeModal={closeModal} userObj={props.userObj} updateUserObj={props.updateUserObj} setInternalCurrentRoomID={setInternalCurrentRoomID} currentRoomID={props.currentRoomID}/> 
            <ToolBar startToyPlace={startToyPlace} modalContent={props.modalContent} modalOpen={props.modalOpen} audioTracks={audioTracks} audioTrackNumber={audioTrackNumber} setAudioTrackNumber={setAudioTrackNumber} audioRef={audioRef} userObj={props.userObj} openModal={openModal} closeModal={closeModal} updateUserObj={props.updateUserObj}/>
            {(props.modalOpen && !props.sideBarOpen) && (<div className="absolute w-full h-full centered-abs-xy bg-black bg-opacity-20 z-[19]" onClick={closeModal}></div>)}
            <Modal width={600} height={350} visible={props.modalOpen} content={props.modalContent}/>
            <Notification notificationOpen={props.notificationOpen} header={props.notificationContent.header} body={props.notificationContent.body} img={props.notificationContent.img}/>
            <BiscuitsNotification biscuits={props.biscuitsJustEarned} visible={props.biscuitNotifVisible}/>
            <audio ref={audioRef} src={audioTracks[audioTrackNumber].link}/>
            <audio ref={sfxRef} src="https://cdn.discordapp.com/attachments/1201919002264490034/1202047959324446720/fireplace_sfx.mp3"/>
        </div>
    )
}

export default Room;

// "https://cdn.discordapp.com/attachments/754243466241769515/1201041221624279101/-_Where_Our_Blue_Is_Tatsuya_Kitani.mp3"
// "https://cdn.discordapp.com/attachments/1201919002264490034/1202047959324446720/fireplace_sfx.mp3"