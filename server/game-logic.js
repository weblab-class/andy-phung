const gameStates = {};

const initializeGame = (roomid) => {
    gameStates[roomid] = {
        connected: [],
        body: "",
    }
};

const deleteGame = (roomid) => {
    delete gameStates[roomid];
};

const getGameState = (roomid) => {
    return gameStates[roomid];
}
 
const appendToBody = (roomid, key) => {
    //console.log(`gamelogic ${key}`);
    gameStates[roomid].body = gameStates[roomid].body.concat(key);
};

const addPlayer = (roomid, name) => {
    gameStates[roomid].connected = [...gameStates[roomid].connected, name];
};

const removePlayer = (roomid, name) => {
    gameStates[roomid].connected = gameStates[roomid].connected.filter((n) => {
        n != name;
    });
    console.log("is this remove player func being called");
}

module.exports = {
    gameStates,
    initializeGame,
    deleteGame,
    getGameState,
    appendToBody,
    addPlayer, 
    removePlayer,
  };