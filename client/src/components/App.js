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

import { achievements } from "./modules/util.js";

/**
 * Define the "App" component
 */
const App = () => {
  const defaultUserObj = {
    user: {
      name: "",
      googleid: "",
      biscuits: 0,
      pfp: "",
      bio: "",
      pics: ["",],
      favPics: ["",],
      achievements: ["",],
      tasksCompleted: 0,
      sessionsCompleted: 0,
      toysBought: ["",],
      sfxVolume: 100,
      musicVolume: 100,
      notifications: true,
      themesUnlocked: ["",],
    }
  };
  const [userId, setUserId] = useState(undefined);
  const [currentRoomID, setCurrentRoomID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>); 
  const [sideBarOpen, setSideBarOpen] = useState(false); // lolol
  const [editing, setEditing] = useState([false, false, false]); // i hate this
  // toggles edit fields in profile modal, only applies there
  const [userObj, setUserObj] = useState(defaultUserObj);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        get("/api/user", {_id: user._id}).then((user) => {
          setUserObj(user);
          console.log(user);
        });
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
      get("/api/user", {_id: user._id}).then((user) => {
        setUserObj(user);
        console.log(user);
      });
      post("/api/initsocket", { socketid: socket.id });
      navigate("/join");
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  /*
  app layers:
  - modal / sidebar: z-30
  - greyout (click anywhere to close): z-20
  - navbar: z-10
  - biscuits: z-9
  - content: z-0

  see NavBar.js for defs
  
  TODO: maybe use useContext/useReducer for App states

  */

  const updateAchievements = (userObj) => { // for now, only works for number achievements
    achievements.forEach((achievement) => {
      let achievementNotInUser = !userObj.user.achievements.includes(achievement.name);
      let satisfiesAchievementCondition;
      for (const [key, value] of Object.entries(achievement.condition)) {
        satisfiesAchievementCondition = userObj.user[key] >= value;
        if(achievementNotInUser && satisfiesAchievementCondition) {
          updateUserObj({
            _id: userObj.user._id,
            append: "push",
            achievements: achievement.name,
          });
          console.log(`got ${achievement.name}`);
          return achievement;
        }
      }
    })
    return {};
  }

  const updateUserObj = (prop) => { // also updates achievements
    prop._id = userObj.user._id;
    post("/api/user", prop).then((bleh) => {
      get("/api/user", {_id: userObj.user._id}).then((user) => {
        setUserObj(user);
        updateAchievements(user);
      })
    });
  }

  

  return (
    <>
      <NavBar visible={useLocation().pathname.includes("/join")} handleLogout={handleLogout} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID} modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} userObj={userObj} updateUserObj={updateUserObj}
      editing={editing} setEditing={setEditing}/>
      <Routes>
        <Route path="/" element={<Landing 
          handleLogin={handleLogin}
            userId={userId}/>}/>
        <Route path="/join" element={<CreateJoinRoom userId={userId} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID}/>}/>
        <Route path="/join/room" // needs to be /join/[room code] eventually
          element={<Room updateAchievements={updateAchievements} userObj={userObj} updateUserObj={updateUserObj} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID} modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} sideBarOpen={sideBarOpen}/>} 
          // TODO: hacky, just need one user obj that flows down all pages
        /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  );
};

export default App;
