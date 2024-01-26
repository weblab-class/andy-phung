/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/ 


const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Cat = require("./models/cat");

// import authentication library 
const auth = require("./auth"); 

// api endpoints: all these paths will be prefixed with "/api/" 
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// lol
const util = require("./util");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => { // takes in mongodb _id
  User.find({_id: req.query._id}).then((users) => {
    // should be unique
    res.send({user: users[0]});
  });
});

router.post("/user", (req, res) => { // takes in mongodb _id + rest of props to update
  //console.log(req.body._id);
  User.find({_id: req.body._id}).then((users) => {
    delete req.body._id;

    if(req.body.append == "inc") { // can take in multiple props
      delete req.body.append;
      users[0].update({$inc: req.body.inc}).then(() => {
        res.send({});
      });
      
    } else if (req.body.append == "push") {
      delete req.body.append;
      users[0].update({$push: req.body}).then(() => {
        res.send({});
      });
    } else {
      users[0].update(req.body).then(() => {
        res.send({});
      })
    };

  });

  
  
});

router.get("/cat", (req, res) => { // takes in name of cat
  Cat.find({name: req.query.name}).then((cats) => {
    // should be only one cat
    res.send({cat: cats[0]});
  });
});

router.post("/joinroom", (req, res) => { // creating a room
  let roomid; 
  let capacity;
  let theme;

  if(req.body.init) {
    roomid = util.generateRandomString(5);

    while(socketManager.checkRoomIDExists(roomid)) {
      roomid = util.generateRandomString(5); // regen if user was unlucky
    }

    capacity = req.body.capacity;
    theme = req.body.theme;
  } else {
    roomid = req.body.roomid;
  }

  const joinState = socketManager.addUserToRoom(req.user, roomid, capacity, theme);

  // intended to be after addUserToRoom; so solo players can get back to their room if accidentally left
  socketManager.deleteEmptyRooms();

  if(joinState == "success") {
    res.send({roomid: roomid});
  } else if (joinState == "full") {
    res.send({errState: "full"});
  } else {
    res.send({errState: "invalid"});
  }

  
});

router.post("/leaveroom", (req, res) => {
  socketManager.removeUserFromRoom(req.user, req.body.roomid);
  console.log(`user left room ${req.body.roomid}`);

  res.send({});

});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
