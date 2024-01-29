import React, { useEffect, useState, memo } from "react";


import biscuit_icon from "../../assets/icons/biscuit_icon.png";


const Modal = (props) => { // 600px, 350px default
    //console.log(props.width);
    //console.log(props.height);
    
    return props.visible && (
        <div className={`bg-[#E7AE6C] border-[#694F31] border-4 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[350px] z-30 overflow-auto`}>
            {props.content}
        </div>
    )
};

const CenterScreen = (props) => { // TODO: pass dims by props; 500px, 263px for createjoinroom
    return <div className="bg-[#E7AE6C] border-[#694F31] border-4 rounded-[2rem] w-[500px] h-[263px] flex items-center justify-center">
        {props.content}
    </div>
}

const SpinningCat = (props) => {
    const [ spinClass, setSpinClass ] = useState(props.first);

    const cats = ["cat-spin-1", "cat-spin-2", "cat-spin-3", "cat-spin-4", "cat-spin-5", "cat-spin-6"]; 


    useEffect(() => {
        setInterval(() => {
            setSpinClass(Math.floor(Math.random()*cats.length));
        }, 10000);
    }, []); // runs only once

    useEffect(() => {
        
    }, [spinClass])


    return (
        <div className={`${cats[spinClass]} z-[-1]`}>
            
        </div>
    )
}

const AchievementCard = (props) => { // takes in name, img, opacity, desc
    // just a sanity check for opacity i would not actually write this

    return props.unlocked ? (
        <div className="flex ml-[2px] mr-[2px] mb-[2px] flex-row h-[100px] w-[270px] border-black border-4 rounded-lg">
            <img src={props.img} className={`ml-[10px] mt-[10px] mr-[10px] w-[65px] h-[65px] opacity-100`}/>
            <div className="mt-[10px] overflow-auto">
                <div className="font-bold">
                    {props.name}
                </div>
                <div>
                    {props.desc}
                </div>
            </div>
        </div>
    ) : (
        <div className="flex ml-[2px] mr-[2px] mb-[2px] flex-row h-[100px] w-[270px] border-black border-4 rounded-lg">
            <img src={props.img} className={`ml-[10px] mt-[10px] mr-[10px] w-[65px] h-[65px] opacity-40`}/>
            <div className="mt-[10px] overflow-auto">
                <div className="font-bold">
                    {props.name}
                </div>
                <div>
                    {props.desc}
                </div>
            </div>
        </div>
    )
}



const Notification = (props) => { // takes in notificationOpen, header, content, img
    const notificationClass = props.notificationOpen ? "absolute top-0 right-0 bg-[#f5f5f5] h-[140px] w-[250px] z-[18] duration-300 transition-right" : "absolute top-0 right-[-250px] bg-[#f5f5f5] h-[140px] w-[250px] z-[18] duration-300 transition-right";

    return (
        <div className={`$flex flex-row flex-nowrap items-center justify-center ${notificationClass} overflow-hidden`}>
            <div>
                <img src={props.img} className="w-[50px] h-[50px] border-red-400 border-4"/>
            </div>
            <div className="border-purple-400 border-4">
                <div>
                    {props.header}
                </div>
                <div>
                    {props.body}
                </div>
            </div>  
        </div>
    )
}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}



const BiscuitsNotification = (props) => { // takes in biscuits, visible
    let biscuitsClass; 
    if(props.visible && props.biscuits != 0) {
        biscuitsClass = "absolute flex flex-row items-center flex-nowrap left-[37px] bottom-[33px] text-[#f5f5f5] candy-beans text-2xl z-[9] biscuits-earn-in opacity-100";
    } else if (!props.visible && props.biscuits != 0) {
        biscuitsClass = "absolute flex flex-row items-center flex-nowrap left-[37px] bottom-[33px] text-[#f5f5f5] candy-beans text-2xl z-[9] biscuits-earn-out opacity-0";
    } else {
        biscuitsClass = "opacity-0";
    }
    return (
        <div className={`${biscuitsClass}`}>
            <div>
                {`+${props.biscuits}`}
            </div>
        </div>
    )
}



export { CenterScreen, Modal, SpinningCat, AchievementCard, Notification, timeout,
BiscuitsNotification }