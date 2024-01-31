import React, { useEffect, useState, memo } from "react";


import biscuit_icon from "../../assets/icons/biscuit_icon.png";


const Modal = (props) => { // 600px, 350px default
    //console.log(props.width);
    //console.log(props.height);
    
    return props.visible && (
        <div className={`bg-clr border-clr border-4 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[350px] z-30`}>
            {props.content}
        </div>
    )
};

const CenterScreen = (props) => { // TODO: pass dims by props; 500px, 263px for createjoinroom
    return <div className="bg-clr border-clr border-4 rounded-[2rem] w-[500px] h-[263px] flex items-center justify-center">
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

const CatCard = (props) => {
    return (
        <div className="flex p-[2px] ml-[2px] mr-[2px] mb-[2px] flex-row h-[100px] w-[270px] border-clr border-4 rounded-lg bg-clr-one">
            <img src={props.img} className={`ml-[10px] mt-auto mb-auto mr-[10px] w-[93.75px] h-[75px]`}/>
            <div className="mt-auto mb-auto h-[75px] overflow-hidden">
                <div className="candy-beans text-lg text-clr m-0">
                    {props.name}
                </div>
                <div className="candy-beans text-xs text-clr m-0">
                    Personality: {props.personality}
                </div>
                <div className="candy-beans text-xs text-clr m-0">
                    {props.attribution}
                </div>
            </div>
        </div>
    )
};

const AchievementCard = (props) => { // takes in name, img, opacity, desc
    // just a sanity check for opacity i would not actually write this

    return props.unlocked ? (
        <div className="flex p-[2px] ml-[2px] mr-[2px] mb-[2px] flex-row h-[100px] w-[270px] border-clr border-4 rounded-lg bg-clr-one">
            <img src={props.img} className={`ml-[10px] mt-auto mb-auto mr-[10px] w-[75px] h-[75px] opacity-100 border-clr border-[3px] rounded-lg`}/>
            <div className="mt-auto mb-auto h-[75px] overflow-hidden">
                <div className="candy-beans text-lg text-clr m-0">
                    {props.name}
                </div>
                <div className="candy-beans text-xs text-clr m-0">
                    {props.desc}
                </div>
            </div>
        </div>
    ) : (
        <div className="flex p-[2px] ml-[2px] mr-[2px] mb-[2px] flex-row h-[100px] w-[270px] border-clr border-4 rounded-lg bg-clr-one">
            <img src={props.img} className={`ml-[10px] mt-auto mb-auto mr-[10px] w-[75px] h-[75px] opacity-40 border-clr border-[3px] rounded-lg`}/>
            <div className="mt-auto mb-auto h-[75px] overflow-hidden">
                <div className="candy-beans text-lg text-clr m-0">
                    {props.name}
                </div>
                <div className="candy-beans text-xs text-clr m-0">
                    {props.desc}
                </div>
            </div>
        </div>
    )
}



const Notification = (props) => { // takes in notificationOpen, header, content, img
    const notificationClass = props.notificationOpen ? "absolute top-[-5px] right-[-10px] border-clr border-l-4 border-b-4 rounded-2xl h-[100px] w-[350px] z-[30] duration-300 transition-right" : "absolute top-[-5px] right-[-350px] border-clr border-l-4 border-b-4 rounded-2xl h-[100px] w-[350px] z-[30] duration-300 transition-right";


    return (
        <div className={`flex flex-row flex-nowrap items-center ${notificationClass} bg-clr overflow-hidden`}>
            <div className="z-[30]">
                <img src={props.img} className="w-[75px] h-[75px] border-clr border-[3px] rounded-xl z-[30] ml-[15px] mr-[15px]"/>
            </div>
            <div className="z-[30] h-[75px]">
                <div className="simply-rounded text-clr text-xl z-[30]">
                    {props.header}
                </div>
                <div className="simply-rounded text-clr z-[30]">
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
BiscuitsNotification, CatCard }