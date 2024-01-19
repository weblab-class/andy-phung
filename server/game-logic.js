const gameState = {
    connected: [], // all ppl connected
    body: "",
};

const appendToBody = (key) => {
    console.log(`gamelogic ${key}`);
    gameState.body = gameState.body.concat(key);
}

const addPlayer = (name) => {
    gameState.connected = [...gameState.connected, name];
};

const removePlayer = (name) => {
    gameState.connected = gameState.connected.filter((n) => {
        n != name;
    })
}

module.exports = {
    gameState,
    appendToBody,
    addPlayer, 
    removePlayer,
  };