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
    "cafe": [ // list of points where cat can spawn (they just spawn for now)
        {
            x: 45, // on fireplace
            y: 3,
        },
        {
            x: -450, // on counter
            y: -1,
        },
        {
            x: -100, // on pillow
            y: -67,
        },
        {
            x: 450, // on railing
            y: -13,
        },
        { 
            x: 290, // next to pot
            y: -84,
        },
    ],
    "backyard": [
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
    "hayden library": [
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

const cats = {
    "Comet": { // likes to sit
        dist: {
            "sitting": 0.7,
            "standing": 0.1,
            "sleeping": 0.2,
        }
    }, 
    "Michi": { // likes to stand
        dist: {
            "sitting": 0.1,
            "standing": 0.8,
            "sleeping": 0.1,
        }
    }, 
    "Sukuna": { // likes to sleep
        dist: {
            "sitting": 0.1,
            "standing": 0.2,
            "sleeping": 0.7,
        }
    }, 
    "Oye": { // likes to stand
        dist: {
            "sitting": 0.2,
            "standing": 0.6,
            "sleeping": 0.2,
        }
    },
    "Gojo Satoru": { // likes to sit
        dist: {
            "sitting": 0.6,
            "standing": 0.2,
            "sleeping": 0.2,
        }
    }
};

const getNewCatState = (cat) => { // takes in individ cat obj
    let rand = Math.random();
    let runningTotal = 0;
    let last;
    for (const [state, prob] of Object.entries(cat.dist)) {
        runningTotal += prob;
        if(runningTotal > rand) {
            return state;
        }
        last = state;
    }
    console.log("returned last????");
    return last; // should never happen

}

const catStates = [
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
            theme: theme,
            surfaces: themeSurfaces[theme],
            cats: [{
                name: Object.keys(cats)[getRandomInt(Object.keys(cats).length-1)],
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

    let catUpdates = [];

    //console.log(`wtf is happening: ${gameStates[roomid]}`);

    if(gameStates[roomid].frame >= 20) { // 20 fps * 30s = 600 frames between every cat state update
        gameStates[roomid].canvas.cats.forEach((cat, idx) => {
            let newState = getNewCatState(cats[cat.name]);
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

    gameStates[roomid].users.forEach((u) => {
        totalTasksCompleted = totalTasksCompleted + u.tasksCompleted;
    });

        if(totalTasksCompleted >= Math.pow(2, gameStates[roomid].canvas.cats.length) && gameStates[roomid].canvas.cats.length < 6) {
            //console.log('spawning new cat');
        // spawning new cat (w not same name)
        while(newCatName == undefined || gameStates[roomid].canvas.cats.some((e) => e.name == newCatName)) {
            newCatName = Object.keys(cats)[getRandomInt(Object.keys(cats).length)];
        };
        while(newCatPosition == undefined || gameStates[roomid].canvas.cats.some((e) => e.position == newCatPosition)) {
            newCatPosition = getRandomInt(5);
        };

        gameStates[roomid].canvas.cats.push({
            name: newCatName,
            position: newCatPosition,
            state: catStates[getRandomInt(catStates.length)],
        });

        catUpdates = [{
            name: newCatName,
            position: newCatPosition,
            to: catStates[getRandomInt(catStates.length)],
            from: "",
        }];
    };

    

    return catUpdates;
};

const addPlayer = (roomid, user) => {
    User.find({_id: user._id}).then((users) => {
        gameStates[roomid].users.push({
            username: user.name,
            _id: user._id,
            userObj: {user: users[0]},
            tasks: [],
            tasksCompleted: 0,
        });
    });
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