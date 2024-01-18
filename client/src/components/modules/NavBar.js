import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

import { Modal } from "./util";

// assets
import menu_icon from "../../assets/icons/menu_icon.svg";
import close_icon from "../../assets/icons/close_icon.png";
import profile_icon from "../../assets/icons/profile_icon.png";
import achievements_icon from "../../assets/icons/achievements_icon.png";
import settings_icon from "../../assets/icons/settings_icon.png";

const GOOGLE_CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";

const SideBar = (props) => {
    const navigate = useNavigate();

    const sidebarClass = props.isOpen ? "bg-white border-4 border-black top-0 absolute h-full w-[300px] transition-left duration-300 z-30 left-0" : "bg-white border-4 border-black left-[-300px] transition-left duration-300 top-0 absolute h-full w-[300px] z-30";

    const profileModal = <div className="flex flex-col">
        <img src={close_icon} className="ml-[15px] mt-[15px] mb-[10px] cursor-pointer" width="20" 
        height="20" onClick={props.closeModal}/>
        profile modal
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <button
            onClick={() => {
                // resetting all three popup states so they dont appear when logging in again
                props.toggleSidebar();
                props.closeModal();

                googleLogout();
                props.handleLogout();
                navigate("/"); 
            }}
            >
            log out
            </button>
        </GoogleOAuthProvider>
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
        <div className={`inline ${sidebarClass}`}>
            <img src={close_icon} className="ml-[17px] mt-[12.5px] mb-[30px] cursor-pointer" width="25" 
            height="25" onClick={() => {
                props.toggleSidebar();
                props.closeModal();
            }}/>
            <div onClick={() => {props.openModal(profileModal)}} className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
                <img src={profile_icon} className="" width="45px"  
                height="45px"/>
                <div className="ml-[11px] text-[25px]">
                    Profile
                </div>
            </div>
            <div onClick={() => {props.openModal(achievementsModal)}} className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
                <img src={achievements_icon} className="" width="45px"  
                height="45px"/>
                <div className="ml-[11px] text-[25px]">
                    Achievements
                </div>
            </div>
            <div onClick={() => {props.openModal(settingsModal)}} className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
                <img src={settings_icon} className="" width="45px"  
                height="45px"/>
                <div className="ml-[11px] text-[25px]">
                    Settings
                </div>
            </div>
        </div>
    )
}

const NavBar = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>); 
    
    const handleSidebarClick = () => {
        setSideBarOpen(!sideBarOpen);
    };

    const openModal = (content) => {
        setModalOpen(true);
        setModalContent(content);
    }
    
    const closeModal = () => {
        setModalOpen(false);
        setModalContent(<></>);
    }
    

    return props.visible && (
        <>
            {sideBarOpen && (<div className="absolute w-full h-full bg-slate-400 bg-opacity-40 z-20" onClick={() => {handleSidebarClick(); closeModal();}}></div>)} 
            <div className="border-b-4 border-black inline-flex w-screen h-14 z-10">
                <img src={menu_icon} className="ml-3 mr-2 cursor-pointer" width="35" 
                height="35" onClick={handleSidebarClick}/>
                <div className="flex items-center text-2xl">
                    purrductive
                </div>
            </div>
            <SideBar isOpen={sideBarOpen} toggleSidebar={handleSidebarClick} openModal={openModal} closeModal={closeModal} handleLogout={props.handleLogout}/>
            <Modal visible={modalOpen} content={modalContent}/>
        </>
        
    )
}

export default NavBar;