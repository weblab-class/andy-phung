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

const addUserToRoom = (user, roomid, capacity=-1, theme="") => { // optional params at the end for /api/joinroom
  if(rooms[roomid] == undefined) {
    rooms[roomid] = {
      users: [userToSocketMap[user._id]],
      capacity: capacity,
      theme: theme
    };
    console.log(`room (size ${capacity}, ${theme}) created with join code: ${roomid}`);
  } else {
    rooms[roomid].users = [...rooms[roomid].users, userToSocketMap[user._id]];
    console.log(`user joined room with join code ${roomid}`);
  }
}

const removeUserFromRoom = (user, roomid) => {
  if(rooms[roomid]) {
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
      delete roomid[key];
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
