import React, { useEffect, useState } from "react";

const Modal = (props) => { // 600px, 350px default
    //console.log(props.width);
    //console.log(props.height);
    return props.visible && (
        <div className={`bg-[#E7AE6C] border-[#694F31] border-4 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[350px] z-30`}>
            {props.content}
        </div>
    )
}

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

export { CenterScreen, Modal, SpinningCat }