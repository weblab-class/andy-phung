import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import "../../utilities.css";

import purrductive_logo_tight from "../../assets/purrductive_logo_tight.png";

const GOOGLE_CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";

const SpinningCat = () => {
    const [ cat, setCat ] = useState("Michi");

    const cats = ["Comet, Michi, Oye"];
    const catClasses = {
        "Comet": "cat-spin-2",
        "Michi": "cat-spin-1",
        "Oye": "cat-spin-3",
    }

    /*

    useEffect(() => {
        setInterval(() => {
            setCat(cats[Math.floor(Math.random()*cats.length)]);
            console.log(`setting to ${catClasses[cat]}`)
        }, 5000);
    }, []); // runs only once

    */


    return (
        <div className={`${catClasses[cat]} z-[-1]`}>
            
        </div>
    )
}


const Landing = ({ userId, handleLogin }) => {

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center justify-center">
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <img src={purrductive_logo_tight} className="h-[95px] mb-[30px]"/>
                    <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                </GoogleOAuthProvider>
                <div className="h-[30px]">

                </div>
            </div>
            <div className="bg-scroll z-[-2]">

            </div>
            <SpinningCat/>
            {/* TODO: add a component w state var that has chance of being randomly changed
             to one of x cat spin classes (i.e. spinning diagonally down), on z-[-1]; same for other file */}
        </div>
    )
}

export default Landing;