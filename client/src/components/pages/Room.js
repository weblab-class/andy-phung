import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket, handleKeyPress } from "../../client-socket.js";
import { post } from "../../utilities"; 

import back_icon from "../../assets/icons/back_icon.png";

const Room = (props) => {
    const navigate = useNavigate();

    useEffect(() => { // only attach client to the room when we know currentRoomID is loaded in
        if(props.currentRoomID != "") { 
            console.log(`client side room id: ${props.currentRoomID}`);
            socket.on(props.currentRoomID, (update) => {
                console.log(update.body);
                console.log(update.connected);
            });
    
            window.addEventListener("keypress", (event) => {
                handleKeyPress(event.key, props.currentRoomID);
                console.log("key pressed");
                // TODO: clean everything up + maybe refactor/package shit into client-socket, etc

            });
    
            // remove event listener on unmount
            return () => {
                window.removeEventListener("keypress", (event) => {
                    handleKeyPress(event, props.currentRoomID);
                });
            };
        }
    }, [props.currentRoomID]); 

    return (
        <div className="flex flex-col">
            <img src={back_icon} width="30px" height="30px" className="cursor-pointer" onClick={() => {
                post("/api/leaveroom", { roomid: props.currentRoomID });
                props.setCurrentRoomID("");
                navigate("/join");
            }}/>
            room!
        </div>
    )
}

export default Room;