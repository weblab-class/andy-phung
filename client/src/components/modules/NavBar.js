import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

import { ImgurClient } from 'imgur';

import { Modal, AchievementCard } from "./util";
import { achievements } from "./data";
import { post, get } from "../../utilities";



// assets
import menu_icon from "../../assets/icons/menu_icon.png";
import menu_icon_hover from "../../assets/icons/menu_icon_hover_2.png";
import close_icon from "../../assets/icons/close_icon.png";
import purrductive_logo from "../../assets/purrductive_logo.png";
import biscuit_icon from "../../assets/icons/biscuit_icon.png";


const GOOGLE_CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";




const SideBar = (props) => { // props.userObj.user._id
    let pfpEdit = props.userObj.user.pfp;
    let pfpBuffer;
    let nameEdit = props.userObj.user.name;
    let bioEdit = props.userObj.user.bio;

    useEffect(() => { // ugh
        
        if(props.modalOpen) {
            props.openModal(modalMapper[props.modalId]);
        } // controls live updates of modals where u set things
    }, [props.editing, props.userObj.user.name, props.userObj.user.bio, props.userObj.user.pfp, props.userObj.user.musicVolume, props.userObj.user.sfxVolume]);

    const navigate = useNavigate();

    const sidebarClass = props.isOpen ? "bg-clr border-[#694F31] border-r-4 top-0 absolute h-full w-[300px] transition-left duration-300 z-30 left-0" : "bg-clr border-[#694F31] border-r-4 left-[-300px] transition-left duration-300 top-0 absolute h-full w-[300px] z-30";

    const profileModal = <div className="flex flex-col items-center">
        <img src={close_icon} className="absolute left-[15px] top-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        <div className="h-[40px]">

        </div>
        <div className="flex flex-row mb-[7px]">
            {props.editing[0] ? (
                <div className="flex flex-col items-center">
                <img src={pfpEdit} className="w-[90px] h-[90px] mr-[20px]"/>
                <input onChange={(e) => {
                    pfpBuffer = e.target.files[0];
                    const client = new ImgurClient({ clientId: "8aeb523ed94ae2b" });
                    //console.log(pfpBuffer)
                    client.upload({
                        image: pfpBuffer,
                    }).then((res) => {
                        console.log(res);
                        props.setEditing([!props.editing[0], props.editing[1], props.editing[2]]);
                        props.updateUserObj({pfp: res.data.link});

                    });
                }} className="font-sm" type="file" id="img" name="img" accept="image/*"></input>
                </div>
                
            ) : (
                <div className="flex flex-col items-center">
                <img src={pfpEdit} className="w-[90px] h-[90px] mr-[20px]"/>
                <svg onClick={() => {
                            props.setEditing([!props.editing[0], props.editing[1], props.editing[2]]);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:opacity-65 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                </div>
                
                
            )}

            
            <div className="flex flex-col">
                <div className="flex flex-row items-center mb-[5px]">
                    {props.editing[1] ? (
                        <>
                        <input autoFocus type="text" onChange={(event) => {
                            nameEdit = event.target.value;
                        }} onKeyDown={(e) => {
                            if(e.key == 'Enter') {
                                props.setEditing([props.editing[0], !props.editing[1], props.editing[2]]);
                                props.updateUserObj({name: nameEdit});
                            }
                        }}/>
                        <svg onClick={() => {
                            props.setEditing([props.editing[0], !props.editing[1], props.editing[2]]);
                            props.updateUserObj({name: nameEdit});
                        }} className="hover:cursor-pointer hover:opacity-65" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        </>
                    ) : (
                        
                        <>
                        <div className="text-3xl font-bold mr-[2px]">
                            {props.userObj.user.name}
                        </div>
                        <svg onClick={() => {
                            props.setEditing([props.editing[0], !props.editing[1], props.editing[2]]);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:opacity-65 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </>
                        
                    )}
                    
                </div>
                <div className="flex flex-row items-center">
                {props.editing[2] ? (
                        <>
                        <input autoFocus type="text" onChange={(event) => {
                            bioEdit = event.target.value;
                        }} onKeyDown={(e) => {
                            if(e.key == 'Enter') {
                                props.setEditing([props.editing[0], props.editing[1], !props.editing[2]]);
                                props.updateUserObj({bio: bioEdit});
                            }
                        }}/>
                        <svg onClick={() => {
                            props.setEditing([props.editing[0], props.editing[1], !props.editing[2]]);
                            props.updateUserObj({bio: bioEdit});
                        }} className="hover:cursor-pointer hover:opacity-65" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        </>
                    ) : (
                        
                        <>
                        <div className="mr-[2px]">
                            {props.userObj.user.bio}
                        </div>
                        <svg onClick={() => {
                            props.setEditing([props.editing[0], props.editing[1], !props.editing[2]]);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[18px] h-[18px] hover:opacity-65 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </>
                        
                    )}

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
                {props.userObj.user.achievements.map((userAchievement) => { // FIXME? not in order
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



    const achievementsModal = <div className="flex flex-col">
        <img src={close_icon} className="sticky ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        <div className="flex flex-col items-center">
            <div>
                Achievements
            </div>
            <div className="flex flex-wrap justify-center">
                {achievements.map((a) => { 
                    return props.userObj.user.achievements.includes(a.name) ? (
                        <AchievementCard name={a.name} desc={a.desc} img={a.img} unlocked={true}/>
                    ) : (
                        <AchievementCard name={"???"} desc={a.desc} img={a.img} unlocked={false}/>
                    )
                })}
            </div>
        </div>
    </div>


    const settingsModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        music volume
        <input onChange={(event) => {
            props.updateUserObj({musicVolume: event.target.value});
        }} type="range" min="0" max="100" defaultValue={`${props.userObj.user.musicVolume}`} class="slider" id="musicSlider"></input>
        sfx volume
        <input onChange={(event) => {
            props.updateUserObj({sfxVolume: event.target.value});
        }} 
        type="range" min="0" max="100" defaultValue={`${props.userObj.user.sfxVolume}`} class="slider" id="sfxSlider"></input>
        notifications
        <input className="" onChange={(event) => {
            console.log(event.target.checked);
            props.updateUserObj({notifications: event.target.checked});
        }} type="checkbox" defaultChecked={props.userObj.user.notifications}></input>
        
    </div>

    const modalMapper = { // what the fuckkk why do i have to do this; FIXME
        "profile": profileModal,
        "achievements": achievementsModal,
        "settings": settingsModal,
    }

    
    return (
        <div className={`justify-between flex flex-col ${sidebarClass}`}>
            <div className="">
                <svg onClick={() => {
                    props.toggleSidebar();
                    props.closeModal();
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#694F31" className="ml-[7.5px] mt-[7px] mb-[30px] hover:cursor-pointer hover:opacity-75 w-[45px] h-[45px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                <div onClick={() => {props.closeModal(); props.setModalId("profile"); props.openModal(profileModal);}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#B49774]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#694F31" className="w-[60px] h-[60px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Profile
                    </div>
                </div>
                <div onClick={() => {props.closeModal(); props.setModalId("achievements"); props.openModal(achievementsModal);}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#B49774]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#694F31" className="w-[60px] h-[60px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>

                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Achievements
                    </div>
                </div>
                <div onClick={() => {props.closeModal(); props.setModalId("settings"); props.openModal(settingsModal);}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#B49774]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#694F31" className="w-[60px] h-[60px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Settings
                    </div>
                </div>
            </div>

            <div className="mb-[10px]">
                {props.currentRoomID == "" ? (<div onClick={() => {
                // resetting all three popup states so they dont appear when logging in again
                props.toggleSidebar();
                props.closeModal();

                googleLogout();
                props.handleLogout();
                navigate("/"); 
                }} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#B49774]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#694F31" className="w-[60px] h-[60px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Sign out
                    </div>
                </div>) : (
                    <div onClick={() => {
                    // resetting all three popup states so they dont appear when logging in again
                    props.toggleSidebar();
                    props.closeModal();
    
                    props.leaveRoom();
                    props.updateUserObj({_id: props.userObj.user._id, inc: {sessionsCompleted: 1,}, append: "inc"});
                    }} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#B49774]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#694F31" className="w-[60px] h-[60px] rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                        <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                            Leave room
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    )
}

const Biscuits = (props) => {
    return (    
        <div className="absolute flex flex-row items-center flex-nowrap left-[10px] bottom-[10px] text-[#f5f5f5] candy-beans text-2xl z-[9]">
            <img src={biscuit_icon} className="w-[27px] h-[27px] mr-[6px]"/>
            <div>
                {props.userObj.user.biscuits}
            </div>
        </div>
    );
  };

const NavBar = (props) => { 
    const [modalId, setModalId] = useState(""); // only applies to navbar/sidebar modals

    const handleSidebarClick = () => {
        props.setSideBarOpen(!props.sideBarOpen);
    };

    const navigate = useNavigate();

    const openModal = (content) => {
        props.setModalOpen(true);
        props.setModalContent(content);
    };
    
    const closeModal = () => {
        props.setModalOpen(false);
        props.setModalContent(<></>);
        props.setEditing([false, false, false]);
        setModalId("");
    };

    const leaveRoom = () => {
        post("/api/leaveroom", { roomid: props.currentRoomID });
        props.setCurrentRoomID("");
        navigate("/join");
    };
    

    return props.visible && (
        <>
            {props.sideBarOpen && (<div className="absolute w-full h-full bg-black bg-opacity-20 z-20" onClick={() => {handleSidebarClick(); closeModal();}}></div>)} 
            <div className="inline-flex w-screen items-center justify-between h-14 z-10">
                <div className="inline-flex items-center w-full h-14 z-10">
                    <img src={menu_icon} className="ml-3 mr-2 hover:cursor-pointer z-10" width="37.5" 
                    height="37.5" onClick={handleSidebarClick} onMouseOver={(e) => {e.currentTarget.src = menu_icon_hover}} onMouseOut={(e) => {e.currentTarget.src = menu_icon}}/>
                    <img src={purrductive_logo} className="h-[70px] z-10 hover:cursor-pointer" onClick={leaveRoom}/>
                </div>
                {props.currentRoomID != "" && (<div className="flex whitespace-nowrap items-center justify-center w-[250px] h-10 mr-[20px] z-10">
                    <div className="mr-[5px] text-xl candy-beans text-[#f5f5f5] z-10">
                        join code:
                    </div>
                    <div className="border-[#f5f5f5] border-4 rounded-lg text-2xl candy-beans text-[#f5f5f5] pr-[5px] pl-[5px] z-10">
                        {props.currentRoomID}
                    </div>
                </div>)}
                
            </div>
            <SideBar modalId={modalId} setModalId={setModalId} modalContent={props.modalContent} updateUserObj={props.updateUserObj} modalOpen={props.modalOpen} editing={props.editing} setEditing={props.setEditing} isOpen={props.sideBarOpen} toggleSidebar={handleSidebarClick} openModal={openModal} closeModal={closeModal} handleLogout={props.handleLogout} currentRoomID={props.currentRoomID} leaveRoom={leaveRoom} userObj={props.userObj} setUserObj={props.setUserObj}/>
            <Modal width={600} height={350} visible={props.modalOpen} content={props.modalContent}/>
            <Biscuits userObj={props.userObj}/>
        </>
        
    )
}

export default NavBar;