const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const rooms = {}; // maps room ID/code to array of user objs

/*
  how this works (creating room): 
  - client (logged in, exists in the two maps above) sends POST to /api/initroom
  - server generates random five letter room id that doesnt exist in rooms
  - + removes user from room if was previously in one and deletes any empty rooms
  - server uses socketManager.addUserToRoom(user, roomid)
  - client receives room id and sets socket listener + destructor for event ${roomid}
  - client sets emit to same event w obj containing cursor position, tool, and whether clicking or not

  (joining room)
  - client POSTs to /api/joinroom
  - same things happen

  - then on: server receives action objs from clients, processes, then sends full updated state at 60 fps (setInterval)
  (connected users, cursor positions/tools/clicking for each player, cat positions/states, toy positions, etc)

  - client can leave room w back button
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

const startRunningGame = (roomid) => {
  const intervalId = setInterval(() => {
    io.emit(roomid, gameLogic.gameState);
  }, 1000 / 60) // 60 fps
  return intervalId;
}

const addUserToRoom = (user, roomid, capacity=-1, theme="") => { // optional params at the end for /api/joinroom
  if(rooms[roomid] == undefined) {
    const intervalId = startRunningGame(roomid);

    gameLogic.addPlayer(user._id);
    console.log(`server listening for updates on ${roomid}`);

    getSocketFromUserID(user._id).on(roomid, (clientUpdate) => { // just a demo its wtv
      console.log(clientUpdate);
      gameLogic.appendToBody(clientUpdate.key);
    }); 

    rooms[roomid] = {
      users: [userToSocketMap[user._id]],
      capacity: capacity,
      theme: theme,
      intervalId: intervalId, // so we can delete interval later
    };
    
    console.log(`room (size ${capacity}, ${theme}) created with join code: ${roomid}`);
  } else {
    gameLogic.addPlayer(user._id);

    getSocketFromUserID(user._id).on(roomid, (clientUpdate) => { // just a demo its wtv
      console.log(clientUpdate);
      gameLogic.appendToBody(clientUpdate.key);
    }); 

    rooms[roomid].users = [...rooms[roomid].users, userToSocketMap[user._id]];
    console.log(`user joined room with join code ${roomid}`);
  }
}

const removeUserFromRoom = (user, roomid) => {
  if(rooms[roomid]) {
    gameLogic.removePlayer(user._id);

    rooms[roomid].users = rooms[roomid].users.filter((socket) => {
      socketToUserMap[socket.id]._id != user._id;
    })
  }
}

const checkRoomIDExists = (roomid) => {
  return roomid in rooms
}

const deleteEmptyRooms = (roomid) => {
  for (const [key, value] of Object.entries(rooms)) {
    if(value.users.length == 0) {
      clearInterval(value.intervalId); // stopping corresponding game
      //io.off(key); // TODO: turning off listener for room (doesnt work)
      delete rooms[key];
      console.log("empty room deleted!")
    }
  }
}




module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
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
