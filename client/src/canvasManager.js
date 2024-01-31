import { storeItems } from "./components/modules/data";
import { catAnimationDict } from "./components/modules/animations";
import { timeout } from "./components/modules/util";

let canvas;

const convertCoord = (x, y) => {
  if (!canvas) {
      console.log("wtf no canvas");
      return;
  }
  return {
    drawX: canvas.width/2 + x,
    drawY: canvas.height/2 - y,
  };
};

const catDimX = 84.75;
const catDimY = 60.1875;

// TODO: need to eventually take in catUpdates for transition/spawn anim (j use built in opacity for spawn anim)



const updateCanvasState = (drawState, frame, catUpdates) => { // canvas dims are 1200 x 250; receives update.gameState.canvas
// use id of canvas element in HTML DOM to get reference to canvas object
canvas = document.getElementById("game-canvas");
if(catUpdates.length > 0) {
  //console.log(catUpdates.map((c) => c.name));
}

//console.log(drawState);

if (!canvas) return;
const context = canvas.getContext("2d");

let catImages = [];
let im;

let imageCount = 0;

const spawnFrames = [0.3, 0.5, 0.7, 0.9];

const allLoaded = () => {
  context.clearRect(0, 0, canvas.width, canvas.height); // for next frame
  catImages.forEach((pkg) => {
    // handling cat spawn
    

    if(drawState.spawningCat == pkg[3]) {
      //console.log("does this run");
      context.globalAlpha = spawnFrames[Math.floor((drawState.spawnFrame % 120)/10)];
      //console.log(context.globalAlpha);
    };

    let { drawX, drawY } = convertCoord(pkg[1], pkg[2]);

    context.drawImage(pkg[0], drawX - catDimX/2, drawY - catDimY/2, catDimX, catDimY);

    context.globalAlpha = 1.0;
  })
};

drawState.cats.forEach(cat => {
  const im = new Image(420, 336);
  // handling sleeping <-> standing and sitting <-> standing transitions
  if(catUpdates.filter((c) => c.name).length > 0) {
    let updateObj = catUpdates.filter((c) => c.name)[0];
    //console.log(updateObj);
    if((updateObj.from == "standing" && updateObj.to == "sitting") || (updateObj.from == "sitting" && updateObj.to == "standing")) {
      im.src = catAnimationDict[cat.name]["sittingTrans"]; 
      console.log("1");
    } else if((updateObj.from == "standing" && updateObj.to == "sleeping") || (updateObj.from == "sleeping" && updateObj.to == "standing")) {
      im.src = catAnimationDict[cat.name]["sleepingTrans"]; 
      console.log("2");
    }
  } else {
    im.src = catAnimationDict[cat.name][cat.state][Math.floor((frame % 120)/10)]; 
    // 2 fps, one new animation frame "requested" every 10 server frames (server fps is 20, runs for 30s before
    // requesting next cat state)
  }
  
  
  
  
  im.onload = () => {
    imageCount += 1;
    if(imageCount == drawState.cats.length) { 
        allLoaded(); 
    };
  };
  catImages.push([im, drawState.surfaces[cat.position].x, drawState.surfaces[cat.position].y, cat.name]);
});
};

const drawToyPlaceAreas = (roomState, rectDimX, rectDimY) => {
  if(roomState) {
    canvas = document.getElementById("toy-place-canvas");

    if (!canvas) return;
    const context = canvas.getContext("2d");
    context.fillStyle = "#808080";

    context.globalAlpha = 0.3;

    

    roomState.surfaces.forEach((location) => {
      let { drawX, drawY } = convertCoord(location.x, location.y);
      context.fillRect(drawX - rectDimX/2, drawY - rectDimY/2, rectDimX, rectDimY);
    });

    context.globalAlpha = 1.0;
  } else {
    console.log("no roomstate :(");
  }
  
}

const clearToyPlaceAreas = () => {
  canvas = document.getElementById("toy-place-canvas");

  if (!canvas) return;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const drawToy = (toy, bbox) => { // toy is j the name
  const toysize = 25;
  canvas = document.getElementById("toy-canvas");

  if (!canvas) return;
  const context = canvas.getContext("2d");

  const im = new Image(toysize + 25, toysize + 25); // extra room for bigger toys; j position on the artboard
  // TODO: need separate store images (centered + bigger)
  let imsrc;

  storeItems.forEach((item) => {
    if(item.name == toy) {
      imsrc = item.img;
    }
  });

  im.src = imsrc;
  
  im.onload = () => {
    // clearing toy area first
    context.clearRect(bbox.x - bbox.rectDimX/2, bbox.y - bbox.rectDimY/2, bbox.rectDimX, bbox.rectDimY);
    let xOffset = -20;
    let yOffset = 20;
    context.drawImage(im, bbox.x - toysize/2 + xOffset, bbox.y - toysize/2 + yOffset, toysize, toysize);
  };



  

}

export { updateCanvasState, drawToyPlaceAreas, clearToyPlaceAreas, drawToy, convertCoord }