import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Skeleton from "./pages/Skeleton.js";

import Landing from "./pages/Landing.js";
import CreateJoinRoom from "./pages/CreateJoinRoom.js";
import Room from "./pages/Room.js";

import "../utilities.css";
import "../index.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [currentRoomID, setCurrentRoomID] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        if(location.pathname == "/") { // kicking user into app if logged in and somehow still on this route
          navigate("/join");
        }
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      navigate("/join");
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar visible={useLocation().pathname.includes("/join")} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Landing 
          handleLogin={handleLogin}
            userId={userId}/>}/>
        <Route path="/join" element={<CreateJoinRoom userId={userId} setCurrentRoomID={setCurrentRoomID}/>}/>
        <Route path="/join/room" // needs to be /join/[room code] eventually
          element={<Room currentRoomID={currentRoomID}/>} // TODO: hacky, just need one user obj that flows down all pages
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  );
};

export default App;
