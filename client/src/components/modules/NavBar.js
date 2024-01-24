import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

import { Modal } from "./util";
import { post } from "../../utilities";



// assets
import menu_icon from "../../assets/icons/menu_icon.png";
import menu_icon_hover from "../../assets/icons/menu_icon_hover_2.png";
import close_icon from "../../assets/icons/close_icon.png";
import profile_icon from "../../assets/icons/profile_icon.png";
import achievements_icon from "../../assets/icons/achievements_icon.png";
import settings_icon from "../../assets/icons/settings_icon.png";
import purrductive_logo from "../../assets/purrductive_logo_2.png";

const GOOGLE_CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";

const SideBar = (props) => {
    const navigate = useNavigate();

    const sidebarClass = props.isOpen ? "bg-[#E7AE6C] border-[#694F31] border-r-4 top-0 absolute h-full w-[300px] transition-left duration-300 z-30 left-0" : "bg-[#E7AE6C] border-[#694F31] border-r-4 left-[-300px] transition-left duration-300 top-0 absolute h-full w-[300px] z-30";

    const profileModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        profile modal
    </div>
    const achievementsModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        achievements modal
    </div>
    const settingsModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        settings modal
    </div>
    
    return (
        <div className={`justify-between flex flex-col ${sidebarClass}`}>
            <div className="">
                <svg onClick={() => {
                    props.toggleSidebar();
                    props.closeModal();
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#694F31" className="ml-[7.5px] mt-[7px] mb-[30px] hover:cursor-pointer hover:opacity-75 w-[45px] h-[45px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                <div onClick={() => {props.openModal(profileModal)}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#DBA568]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#694F31" className="w-[60px] h-[60px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Profile
                    </div>
                </div>
                <div onClick={() => {props.openModal(achievementsModal)}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#DBA568]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#694F31" class="w-[60px] h-[60px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>

                    <div className="ml-[7px] text-[27px] candy-beans text-[#694F31]">
                        Achievements
                    </div>
                </div>
                <div onClick={() => {props.openModal(settingsModal)}} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#DBA568]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#694F31" class="w-[60px] h-[60px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
                }} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#DBA568]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#694F31" class="w-[60px] h-[60px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
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
                    }} className="flex items-center pt-[10px] pb-[10px] pl-[20px] cursor-pointer hover:bg-[#DBA568]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#694F31" class="w-[60px] h-[60px] rotate-180">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
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

const NavBar = (props) => { 
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
            <SideBar isOpen={props.sideBarOpen} toggleSidebar={handleSidebarClick} openModal={openModal} closeModal={closeModal} handleLogout={props.handleLogout} currentRoomID={props.currentRoomID} leaveRoom={leaveRoom}/>
            <Modal width={600} height={350} visible={props.modalOpen} content={props.modalContent}/>
        </>
        
    )
}

export default NavBar;