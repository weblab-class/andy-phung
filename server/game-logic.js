/*
how this works:
- clients send updated own task lists + their total num of tasks completed
- server updates its task lists + total num of tasks completed in room
- server spawns new cat in random, but spaced out location based on total num of tasks completed
    - cats drop

- cats each have their own basic animations: idle, walking left, walking right, sitting, sleeping
- each has a certain duration
- cats internally will either be doing something (walking, etc) or not (static animations)
- (not eos) cats are idle and will stay where they are spawned; updateCatState will have a small
chance of switching them to a different idle state
- (eos) at every frame, a global updateCatState function called on each cat will have a 
a rlly small chance of switching cat's state to doing smth
- in animation object in cat object, there should be frame number (0 when first switched to it 
+ animation frames loaded in via api call); can then just call a get next frame function to keep 
looping until animation switched

*/


const themeSurfaces = {
    "cafe": [ // list of points where cat can spawn (they just spawn for now)
        {
            x: 0,
            y: 0,
        },
        {
            x: -300,
            y: 0,
        },
        {
            x: -600,
            y: 0,
        },
        {
            x: 300,
            y: 0,
        },
        {
            x: 600,
            y: 0,
        },
    ],
    "backyard": [
        {
            x: 0,
            y: 0,
        },
        {
            x: -300,
            y: 0,
        },
        {
            x: -600,
            y: 0,
        },
        {
            x: 300,
            y: 0,
        },
        {
            x: 600,
            y: 0,
        },
    ],
    "hayden library": [
        {
            x: 0,
            y: 0,
        },
        {
            x: -300,
            y: 0,
        },
        {
            x: -600,
            y: 0,
        },
        {
            x: 300,
            y: 0,
        },
        {
            x: 600,
            y: 0,
        },
    ],

};

catNames = [
    "Comet", "Michi", "Mocha", "Luna", "Guangdang", "Gojo Satoru"
];

catStates = [
    "sitting",
    "standing",
    "sleeping",
]

getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const gameStates = {};

const initializeGame = (roomid, theme) => {
    gameStates[roomid] = {
        users: [],
        canvas: {
            surfaces: themeSurfaces[theme],
            cats: [{
                name: catNames[getRandomInt(catNames.length-1)],
                position: getRandomInt(5),
                state: catStates[getRandomInt(catStates.length-1)],
            }], 
        },
    }
};

const deleteGame = (roomid) => {
    delete gameStates[roomid];
};

const getGameState = (roomid) => {
    return gameStates[roomid];
};
 
const updateTasks = (roomid, user, newTasks, newTasksCompleted) => {
    gameStates[roomid].users.forEach((userObj, idx) => {
        if(userObj.username == user.name) {
            gameStates[roomid].users[idx].tasks = newTasks;
            gameStates[roomid].users[idx].tasksCompleted = newTasksCompleted;
        }
    });
};

const updateGameState = (roomid) => {
    let totalTasksCompleted = 0;
    let newCatName;
    let newCatPosition;

    //console.log(`wtf is happening: ${gameStates[roomid]}`);

    gameStates[roomid].users.forEach((u) => {
        totalTasksCompleted = totalTasksCompleted + u.tasksCompleted;
    });
        if(totalTasksCompleted >= Math.pow(2, gameStates[roomid].canvas.cats.length) && gameStates[roomid].canvas.cats.length < 6) {
        // spawning new cat (w not same name)
        while(newCatName == undefined || gameStates[roomid].canvas.cats.some((e) => e.name == newCatName)) {
            newCatName = catNames[getRandomInt(catNames.length-1)]
        };
        while(newCatPosition == undefined || gameStates[roomid].canvas.cats.some((e) => e.position == newCatPosition)) {
            newCatPosition = getRandomInt(5);
        };

        gameStates[roomid].canvas.cats.push({
            name: newCatName,
            position: newCatPosition,
            state: catStates[getRandomInt(catStates.length-1)],
        });
    };

};

const addPlayer = (roomid, user) => {
    gameStates[roomid].users.push({
        username: user.name,
        tasks: [],
        tasksCompleted: 0,
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
    updateGameState,
    updateTasks,
    addPlayer, 
    removePlayer,
  };