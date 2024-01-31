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

import { Notification, timeout } from "./modules/util.js";
import { achievements, catAnimationDict, themeSurfaces } from "./modules/data.js";

import { Texture } from 'pixi.js';

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
      catsSeen: ["",]
    }
  };

  // wtfff waht is this
  // (too lazy to switch to contexts but still think this is bad)
  const [userId, setUserId] = useState(undefined);
  const [currentRoomID, setCurrentRoomID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>); 
  const [sideBarOpen, setSideBarOpen] = useState(false); // lolol
  const [editing, setEditing] = useState([false, false, false]); // i hate this
  // toggles edit fields in profile modal, only applies there
  const [userObj, setUserObj] = useState(defaultUserObj);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState({
    header: "",
    body: "",
  });
  const [biscuitsJustEarned, setBiscuitsJustEarned] = useState(0);
  const [biscuitNotifVisible, setBiscuitNotifVisible] = useState(false);
  const [theme, setTheme] = useState("cafe");

  // prop drilling goes crazyy

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
  - notification: z-19
  - navbar: z-10
  - biscuits: z-9
  - content: z-0

  see NavBar.js for defs
  
  TODO: maybe use useContext/useReducer for App states

  */

  const createNotification = async (props) => { // this isnt a component but wtv idc
    if(userObj.user.notifications) {
      setNotificationOpen(true);
      setNotificationContent({
        header: props.header,
        body: props.body,
        img: props.img,
      });
      await timeout(4000);
      setNotificationOpen(false);
      setNotificationContent({
        header: "",
        body: "",
        img: "",
      });
    }
  };

  const createBiscuitNotification = async (biscuits) => {
    if(userObj.user.notifications) {
      setBiscuitNotifVisible(true);
      setBiscuitsJustEarned(biscuits);
      await timeout(100);
      setBiscuitNotifVisible(false);
    }
  };

  

  const updateAchievements = (userObj) => { // for now, only works for number achievements
    achievements.forEach((achievement) => {
      //console.log(achievement.name);
      let achievementNotInUser = !userObj.user.achievements.includes(achievement.name);
      let satisfiesAchievementCondition;
      for (const [key, value] of Object.entries(achievement.condition)) {
        if(typeof value === 'number') { // tasks and sessions
          satisfiesAchievementCondition = userObj.user[key] >= value;
        } else if (typeof value === 'string') { // catsSeen
          satisfiesAchievementCondition = userObj.user[key].includes(value);
        } else if (value.constructor === Array) { // toysBought (ex. [1])
          satisfiesAchievementCondition = userObj.user[key].length >= value[0];
        }
        
        if(achievementNotInUser && satisfiesAchievementCondition) {
          let prop = {
            _id: userObj.user._id,
            append: "push",
            push: {
              achievements: achievement.name,
            }
          };
          prop._id = userObj.user._id;
          post("/api/user", prop).then((bleh) => {
            get("/api/user", {_id: userObj.user._id}).then((user) => {
              setUserObj(user);
              console.log(`got ${achievement.name}`);
              createNotification({header: achievement.name, body: achievement.desc, img: achievement.img});
              return achievement;
            })
          });
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

useEffect(() => {
  const handleBeforeUnload = function(event) {
    //event.preventDefault();

    post("/api/leaveroom", {user: userObj.user}).then(() => {
    })
    if(currentRoomID != "") {
      updateUserObj({_id: userObj.user._id, inc: {sessionsCompleted: 1,}, append: "inc"});
    };
    //event.returnValue = 'are you sure?';
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }
});


  

  return (
    <>
      <NavBar visible={useLocation().pathname.includes("/join")} handleLogout={handleLogout} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID} modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} userObj={userObj} updateUserObj={updateUserObj}
      editing={editing} setEditing={setEditing}/>
      <Routes>
        <Route path="/" element={<Landing 
          handleLogin={handleLogin}
            userId={userId}/>}/>
        <Route path="/join" element={<CreateJoinRoom updateUserObj={updateUserObj} userObj={userObj} setTheme={setTheme} setBiscuitsJustEarned={setBiscuitsJustEarned} userId={userId} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID}/>}/>
        <Route path="/join/room" // needs to be /join/[room code] eventually
          element={<Room theme={theme} setTheme={setTheme} createBiscuitNotification={createBiscuitNotification} biscuitNotifVisible={biscuitNotifVisible} biscuitsJustEarned={biscuitsJustEarned} createNotification={createNotification} notificationOpen={notificationOpen} notificationContent={notificationContent} updateAchievements={updateAchievements} userObj={userObj} updateUserObj={updateUserObj} currentRoomID={currentRoomID} setCurrentRoomID={setCurrentRoomID} modalOpen={modalOpen} setModalOpen={setModalOpen} modalContent={modalContent} setModalContent={setModalContent} sideBarOpen={sideBarOpen}/>} 
          // TODO: hacky, just need one user obj that flows down all pages
        /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </> 
  );
};

export default App;
