const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const rooms = {}; // maps room ID/code to array of user objs

// TODO: fix disconnect issues (appendToBody, maybe more)

/*
  how this works (creating room): 
  - client (logged in, exists in the two maps above) sends POST to /api/joinroom
  - server generates random five letter room id that doesnt exist in rooms
  - + removes user from room if was previously in one and deletes any empty rooms
  - server uses socketManager.addUserToRoom(user, roomid) to set up user-specific listener and emitter
  - client receives room id and sets socket listener
  - client sets emit to same event w obj containing cursor position, tool, and whether clicking or not

  (joining room)
  - client POSTs to /api/joinroom
  - same things happen except no new room created

  - then on: server receives action objs from clients, processes, then sends full updated state at 60 fps (setInterval)
  (connected users, cursor positions/tools/clicking for each player, cat positions/states, toy positions, etc)

  - client can leave room w back button
*/

/*
  gameObjs (stored in rooms) used to manage socket groupings; 
  elements of gameStates (in game-logic.js) manage corresponding game state
*/

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const getSocketsInRoom = (roomid) => rooms[roomid];

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // TODO: is this the behavior you want? 
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

const startGameBroadcast = (roomid, user) => {

  const intervalId = setInterval(() => {
    gameLogic.updateGameState(roomid);
    try {
      getSocketFromUserID(user._id).emit(roomid, {
        username: user.name,
        gameState: gameLogic.gameStates[roomid],
      }); // user doesn't know who they are rn lmfao; TODO: fix this once u impl api calls from database
    } catch (err) {
      console.log("user closed tab");
      clearInterval(intervalId);
      // not removing from room in case they closed tab accidentally
    }
  }, 1000 / 60) // 60 fps
  return intervalId;
};

const endGameBroadcast = (roomid, user, rooms) => {
  for (var i = 0; i < rooms[roomid].users.length; i++) {
    if(rooms[roomid].users[i] == user._id) {
      clearInterval(rooms[roomid].intervalIds[i]);
      return rooms[roomid].intervalIds[i];
    }
 };
}

const initUserListener = (roomid, user) => {
  getSocketFromUserID(user._id).on(roomid, (clientUpdate) => {
    if(clientUpdate.keepAlive) {

    } else {
      //console.log(`tasks completed: ${clientUpdate.userTasksCompleted}`);
      gameLogic.updateTasks(roomid, user, clientUpdate.userTasks, clientUpdate.userTasksCompleted);
    }
  }); 
}

const deleteUserListener = (roomid, user) => {
  try {
    getSocketFromUserID(user._id).off(roomid); 
  } catch(err) {

  }
  
};

const addUserToRoom = (user, roomid, capacity=-1, theme="") => { // optional params at the end for /api/joinroom
  if(rooms[roomid] == undefined && capacity != -1) { // if user is trying to create a new room
    gameLogic.initializeGame(roomid, theme);
    gameLogic.addPlayer(roomid, user);
    
    initUserListener(roomid, user);

    const intervalId = startGameBroadcast(roomid, user);

    rooms[roomid] = {
      users: [user._id], // sockets and not users for some reason; FIXME?
      capacity: capacity,
      theme: theme,
      intervalIds: [intervalId], // so we can delete intervals later
    };
    
    console.log(`user ${user.name} created room ${roomid} (size ${capacity}, ${theme})`);

    return "success";
  } else if (rooms[roomid] == undefined && capacity == -1) { // if user entered an invalid room code
    return "invalid";
  } else if (rooms[roomid] != undefined) { // if user entered a valid room code
    if(rooms[roomid].capacity == rooms[roomid].users.length) {
      return "full";
    }

    gameLogic.addPlayer(roomid, user);

    initUserListener(roomid, user);
    console.log(`server listening on ${roomid} from ${user.name}`);

    rooms[roomid].users = [...rooms[roomid].users, user._id];

    const intervalId = startGameBroadcast(roomid, user);
    rooms[roomid].intervalIds = [...rooms[roomid].intervalIds, intervalId];

    console.log(`user ${user.name} joined room ${roomid}`);

    return "success";
  }
};

const removeUserFromRoom = (user, roomid) => {
  if(rooms[roomid]) {
    gameLogic.removePlayer(roomid, user);

    // delete listener for user updates
    deleteUserListener(roomid, user);

    // end broadcast to user by deleting their setInterval
    const intervalToDelete = endGameBroadcast(roomid, user, rooms);

    // delete user + their intervalId from gameObj
    rooms[roomid].users = rooms[roomid].users.filter((id) => {
      id != user._id;
    })
    rooms[roomid].intervalIds = rooms[roomid].intervalIds.filter((intervalId) => {
      intervalId != intervalToDelete;
    })

    
    
    console.log(`user ${user.name} left room ${roomid}`);

  }
};

const checkRoomIDExists = (roomid) => {
  return roomid in rooms
};

const deleteEmptyRooms = () => {
  for (const [roomid, roomObj] of Object.entries(rooms)) {
    if(roomObj.users.length == 0) {
      gameLogic.deleteGame(roomid); // deleting corresponding game in logic
      delete rooms[roomid]; // deleting game in this file

      console.log("empty room deleted!")
    }
  }
};




module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        console.log(`disconnect reason: ${reason}`);
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getSocketsInRoom: getSocketsInRoom,
  addUserToRoom: addUserToRoom,
  removeUserFromRoom: removeUserFromRoom,
  checkRoomIDExists: checkRoomIDExists,
  deleteEmptyRooms: deleteEmptyRooms,
  getIo: () => io,
};
