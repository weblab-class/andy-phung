const gameStates = {};

const initializeGame = (roomid) => {
    gameStates[roomid] = {
        users: []
    }
};

const deleteGame = (roomid) => {
    delete gameStates[roomid];
};

const getGameState = (roomid) => {
    return gameStates[roomid];
}
 
const updateTasks = (roomid, user, newTasks) => {
    gameStates[roomid].users.forEach((userObj, idx) => {
        if(userObj.username == user.name) {
            gameStates[roomid].users[idx].tasks = newTasks;
        }
    });
}

const addPlayer = (roomid, user) => {
    gameStates[roomid].users.push({
        username: user.name,
        tasks: []
    })
};

const removePlayer = (roomid, user) => {
    gameStates[roomid].users = gameStates[roomid].users.filter((n) => {
        n.username != user.name;
    });
};

module.exports = {
    gameStates,
    initializeGame,
    deleteGame,
    getGameState,
    updateTasks,
    addPlayer, 
    removePlayer,
  };