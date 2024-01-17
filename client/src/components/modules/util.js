import React, { useState } from "react";

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
        <div className="bg-red-400 absolute ml-auto mr-auto w-[100px] h-[100px]">
            {props.content}
        </div>
    )
}

// <SideBar/>
const SideBar = (props) => {
    const sidebarClass = props.isOpen ? "bg-white border-4 border-black top-0 absolute h-full w-[300px] transition-left duration-300 z-20 left-0" : "bg-white border-4 border-black left-[-300px] transition-left duration-300 top-0 absolute h-full w-[300px] z-20";
    
    return (
        <div className={`inline ${sidebarClass}`}>
            <img src={close_icon} className="ml-[17px] mt-[12.5px] mb-[30px] cursor-pointer" width="25" 
            height="25" onClick={props.toggleSidebar}/>
            <div className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
                <img src={profile_icon} className="" width="45px"  
                height="45px"/>
                <div className="ml-[11px] text-[25px]">
                    Profile
                </div>
            </div>
            <div className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
                <img src={achievements_icon} className="" width="45px"  
                height="45px"/>
                <div className="ml-[11px] text-[25px]">
                    Achievements
                </div>
            </div>
            <div className="flex items-center pt-[15px] pb-[15px] pl-[20px] cursor-pointer hover:bg-gray-300">
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
    const [modalOpen, setModalOpen] = useState(false); // idk what im doing
    // TODO: rework how u impl and use modals

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    }

    const handleSidebarClick = () => {
        setSideBarOpen(!sideBarOpen);
    };

    return props.visible && (
        <>
            <div className="border-4 border-black inline-flex w-screen h-14 z-10">
                <img src={menu_icon} className="ml-3 mr-2 cursor-pointer" width="35" 
                height="35" onClick={handleSidebarClick}/>
                <div className="flex items-center text-2xl">
                    purrductive
                </div>
            </div>
            <SideBar isOpen={sideBarOpen} toggleSidebar={handleSidebarClick} handleModalToggle={handleModalToggle}/>

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