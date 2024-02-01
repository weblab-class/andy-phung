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
chance of switching them to a different idle state; probabilities of switching are AIs that need to be 
retrieved from API

- (eos) at every frame, a global updateCatState function called on each cat will have a 
a rlly small chance of switching cat's state to doing smth
- in animation object in cat object, there should be frame number (0 when first switched to it 
+ animation frames loaded in via api call); can then just call a get next frame function to keep 
looping until animation switched

*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Cat = require("./models/cat");

const themeSurfaces = {
    "cafe": [ // list of points where cat can spawn
    {
        x: 45, // on fireplace
        y: -2,
    },
    {
        x: -440, // on counter
        y: -9,
    },
    {
        x: -100, // on pillow
        y: -78,
    },
    {
        x: 450, // on railing
        y: -16,
    },
    { 
        x: 290, // next to pot
        y: -89,
    },
    {
        x: -460, // counter ground 1
        y: -89,
    },
    {
        x: -300, // counter ground 2
        y: -89,
    },
    {
        x: 120, // fireplace ground
        y: -89,
    },
    {
        x: 470, // railing ground
        y: -89,
    },
    { 
        x: 235, // bookshelf
        y: -32,
    },
    ],
    "apricity": [
        {
            x: 0,
            y: -100,
        },
        {
            x: -200,
            y: -100,
        },
        {
            x: -400,
            y: -100,
        },
        {
            x: 200,
            y: -100,
        },
        {
            x: 400,
            y: -100,
        },
    ],
};

const commonCats = {
    "Shiro": {
        "sitting": 0.5,
        "standing": 0.05,
        "sleeping": 0.1,
        "sittingPurring": 0.3,
        "standingMeowing": 0.05,
    },
    "Tobi": {
        "sitting": 0.05,
        "standing": 0.5,
        "sleeping": 0.05,
        "sittingPurring": 0.1,
        "standingMeowing": 0.3,
    },
    "Mocha": {
        "sitting": 0.1,
        "standing": 0.05,
        "sleeping": 0.7,
        "sittingPurring": 0.1,
        "standingMeowing": 0.05,
    },
    "Megumi": {
        "sitting": 0.2,
        "standing": 0.05,
        "sleeping": 0.4,
        "sittingPurring": 0.3,
        "standingMeowing": 0.05,
    },
    "Guangdang": {
        "sitting": 0.1,
        "standing": 0.05,
        "sleeping": 0.4,
        "sittingPurring": 0.4,
        "standingMeowing": 0.05,
    },
    "Luna": {
        "sitting": 0.05,
        "standing": 0.4,
        "sleeping": 0.2,
        "sittingPurring": 0.05,
        "standingMeowing": 0.3,
    },
    "Kiko": {
        "sitting": 0.05,
        "standing": 0.05,
        "sleeping": 0.05,
        "sittingPurring": 0.05,
        "standingMeowing": 0.8,
    },
    "Sesame": {
        "sitting": 0.1,
        "standing": 0.3,
        "sleeping": 0.2,
        "sittingPurring": 0.1,
        "standingMeowing": 0.3,
    },
    "Lola": {
        "sitting": 0.3,
        "standing": 0.3,
        "sleeping": 0.3,
        "sittingPurring": 0.05,
        "standingMeowing": 0.05,
    },
};

const rareCats = {
    "Comet": { 
            "sitting": 0.1,
            "standing": 0.05,
            "sleeping": 0.05,
            "sittingPurring": 0.7,
            "standingMeowing": 0.1,
    }, 
    "Michi": { // likes to stand
            "sitting": 0.1,
            "standing": 0.3,
            "sleeping": 0.1,
            "sittingPurring": 0.1,
            "standingMeowing": 0.4,
    }, 
    "Sukatna": { // likes to sleep
            "sitting": 0.05,
            "standing": 0.05,
            "sleeping": 0.7,
            "sittingPurring": 0.2,
            "standingMeowing": 0,
    }, 
    "oye": { // likes to stand
            "sitting": 0.5,
            "standing": 0.3,
            "sleeping": 0.05,
            "sittingPurring": 0.1,
            "standingMeowing": 0.05,
    },
    "Gojo Catoru": { // likes to sit
            "sitting": 0.2,
            "standing": 0.2,
            "sleeping": 0.1,
            "sittingPurring": 0.1,
            "standingMeowing": 0.4,
    }
};



const catStates = [
    "sitting",
    "standing",
    "sleeping",
    "sittingPurring",
    "standingMeowing",
];

const catStateMapper = {
    "sitting": ["sitting", "standing", "sittingPurring"],
    "standing": ["standing", "sitting", "sleeping"],
    "sleeping": ["sleeping", "standing"],
    "sittingPurring": ["sittingPurring", "sitting"],
    "standingMeowing": ["standingMeowing", "standing"],
};

const getNewCatState = (cat, currentState) => { // takes in individ cat obj
    let rand = Math.random();
    let runningTotal = 0;
    let defaultState;
    for (const [state, prob] of Object.entries(cat)) {
        runningTotal += prob;
        if(runningTotal > rand && catStateMapper[currentState].includes(state)) {
            //console.log("state transitioned succesfully");
            return state;
        }
        last = state;
    }

    defaultState = currentState;
    return defaultState;

}

getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

function getRandomIntRanged(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gameStates = {};

const initializeGame = (roomid, theme) => {
    const newCatName = Object.keys(commonCats)[getRandomInt(Object.keys(commonCats).length-1)];
    gameStates[roomid] = {
        users: [],
        canvas: {
            theme: theme,
            surfaces: themeSurfaces[theme],
            cats: [{
                name: newCatName,
                position: getRandomInt(themeSurfaces[theme].length),
                state: catStates[getRandomInt(catStates.length-1)],
            }], 
            spawnCountdown: -1, // between 1-3 seconds -> 20fps * [1,3] = [20, 60]
            spawnFrame: -1, // 4 spawn frames ([0, 30] bc zero-indexed) at opacities 0.3, 0.5, 0.7, 0.9
            spawningCat: "",
            updateObjToSend: {},
        },
        frame: 0,
    }
    return newCatName;
};

const deleteGame = (roomid) => {
    delete gameStates[roomid];
};

const getGameState = (roomid) => {
    return gameStates[roomid];
};
 
const updateTasks = (roomid, user, newTasks, newTasksCompleted) => {
    try {
        gameStates[roomid].users.forEach((userObj, idx) => {
            if(userObj.username == user.name) {
                gameStates[roomid].users[idx].tasks = newTasks;
                gameStates[roomid].users[idx].tasksCompleted = newTasksCompleted;
            }
        });
    } catch {

    }
    
};

const updateGameState = (roomid) => {
    try {
        let totalTasksCompleted = 0;
    let newCatName;
    let newCatPosition;
    let newCatState;

    let catUpdates = [];

    //console.log(`wtf is happening: ${gameStates[roomid]}`);

    if(gameStates[roomid].frame >= 1200) { // 20 fps * 60s = 1200 frames between every cat state update
        gameStates[roomid].canvas.cats.forEach((cat, idx) => {
            let newState;
            if(cat.name in commonCats) {
                newState = getNewCatState(commonCats[cat.name], cat.state);
            } else if(cat.name in rareCats) {
                newState = getNewCatState(rareCats[cat.name], cat.state);
            }
             
            if(newState != cat.state) {
                catUpdates.push({
                    name: cat.name,
                    position: cat.position,
                    to: newState,
                    from: cat.state,
                });
                gameStates[roomid].canvas.cats[idx].state = newState;
            };
        })
        gameStates[roomid].frame = 0;
    } else {
        gameStates[roomid].frame += 1;
    };

    if(gameStates[roomid].canvas.spawnCountdown == 0) {
        gameStates[roomid].canvas.spawnCountdown = -1;
        gameStates[roomid].canvas.spawnFrame = 0;
        const updateObj = gameStates[roomid].canvas.updateObjToSend;
        catUpdates = [updateObj];
        gameStates[roomid].canvas.spawningCat = updateObj.name;

        gameStates[roomid].canvas.cats.push({
            name: updateObj.name,
            position: updateObj.position,
            state: updateObj.to,
        });
        gameStates[roomid].canvas.updateObjToSend = {};
    } else if(gameStates[roomid].canvas.spawnCountdown != -1) {
        gameStates[roomid].canvas.spawnCountdown += -1;
    };


    if(gameStates[roomid].canvas.spawnFrame > 30) {
        gameStates[roomid].canvas.spawnFrame = -1;
        gameStates[roomid].canvas.spawningCat = "";
    } else if(gameStates[roomid].canvas.spawnFrame != -1) {
        gameStates[roomid].canvas.spawnFrame += 1;
    };

    

    gameStates[roomid].users.forEach((u) => {
        totalTasksCompleted = totalTasksCompleted + u.tasksCompleted;
    });

    if(totalTasksCompleted >= Math.floor(Math.pow(1.5, gameStates[roomid].canvas.cats.length)) && gameStates[roomid].canvas.cats.length < 8) {
        //console.log('spawning new cat');
        // spawning new cat (w not same name)
        let rareCat = Math.random() <= 0.05;
        while(newCatName == undefined || gameStates[roomid].canvas.cats.some((e) => e.name == newCatName)) {
            if(rareCat) {
                //console.log("rare cat spawned!");
                newCatName = Object.keys(rareCats)[getRandomInt(Object.keys(rareCats).length)];
            } else {
                newCatName = Object.keys(commonCats)[getRandomInt(Object.keys(commonCats).length)];
            };
        };
        while(newCatPosition == undefined || gameStates[roomid].canvas.cats.some((e) => e.position == newCatPosition)) {
            newCatPosition = getRandomInt(gameStates[roomid].canvas.surfaces.length);
        };


        if(gameStates[roomid].canvas.spawnCountdown == -1) {
            newCatState = catStates[getRandomInt(catStates.length)];
            gameStates[roomid].canvas.spawnCountdown = getRandomIntRanged(20, 61);
            gameStates[roomid].canvas.updateObjToSend = {
                name: newCatName,
                position: newCatPosition,
                to: newCatState,
                from: "",
            };      
        };
    };

    

    return catUpdates;
    }
    catch {
        return [];
    }
    
};

const addPlayer = (roomid, user) => {
    try {
        User.find({_id: user._id}).then((users) => {
            gameStates[roomid].users.push({
                username: user.name,
                _id: user._id,
                userObj: {user: users[0]},
                tasks: [],
                tasksCompleted: 0,
            });
        });
    } catch {
        
    }
    
};

const removePlayer = (roomid, user) => {
    gameStates[roomid].users = gameStates[roomid].users.filter((n) => {
        n._id != user._id;
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