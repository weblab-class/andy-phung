import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";

// TODO: maybe move some of these into separate files (NavBar+SideBar, )

// assets
import menu_icon from "../../assets/icons/menu_icon.svg";
import close_icon from "../../assets/icons/close_icon.png";
import profile_icon from "../../assets/icons/profile_icon.png";
import achievements_icon from "../../assets/icons/achievements_icon.png";
import settings_icon from "../../assets/icons/settings_icon.png";

// <Modal/>
const Modal = (props) => {
    return props.visible && (
        <div className="bg-white border-black border-4 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[350px] z-20">
            {props.content}
        </div>
    )
}

// <SideBar/>
const SideBar = (props) => {
    const navigate = useNavigate();

    const sidebarClass = props.isOpen ? "bg-white border-4 border-black top-0 absolute h-full w-[300px] transition-left duration-300 z-20 left-0" : "bg-white border-4 border-black left-[-300px] transition-left duration-300 top-0 absolute h-full w-[300px] z-20";

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
            Logout
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
            height="25" onClick={props.toggleSidebar}/>
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

// <NavBar/>
const NavBar = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>); 
    
    // TODO: reset those three if { loggedOut } = useLocation().state;
    

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
            <div className="border-4 border-black inline-flex w-screen h-14 z-10">
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

const CenterScreen = (props) => { // TODO: pass dims by props; 500px, 263px for createjoinroom
    return <div className="border-black border-4 rounded-[2rem] w-[500px] h-[263px] flex items-center justify-center">
        {props.content}
    </div>
}

// <CenterScreen/> 
// <Collapsible/>; might j use ext pkg for this

export { NavBar, CenterScreen, Modal }