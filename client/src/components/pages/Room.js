import React from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../../utilities";

import back_icon from "../../assets/icons/back_icon.png";

const Room = (props) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <img src={back_icon} width="30px" height="30px" className="cursor-pointer" onClick={() => {
                navigate("/join");
                post("/api/leaveroom", { roomid: props.currentRoomID });
            }}/>
            room!
        </div>
    )
}

export default Room;