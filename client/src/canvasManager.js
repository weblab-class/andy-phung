import { catAnimationDict, storeItems } from "./components/modules/data";

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



const updateCanvasState = (drawState, frame) => { // canvas dims are 1200 x 250; receives update.gameState.canvas
// use id of canvas element in HTML DOM to get reference to canvas object
canvas = document.getElementById("game-canvas");

if (!canvas) return;
const context = canvas.getContext("2d");

let catImages = [];
let im;

let imageCount = 0;

const allLoaded = () => {
  context.clearRect(0, 0, canvas.width, canvas.height); // for next frame
  catImages.forEach((im) => {
    let { drawX, drawY } = convertCoord(im[1], im[2]);
    //console.log(`drawX: ${drawX}`);
    //console.log(`drawY: ${drawY}`);
    context.drawImage(im[0], drawX - catDimX/2, drawY - catDimY/2, catDimX, catDimY);
  })
}

drawState.cats.forEach(cat => {
  const im = new Image(420, 336);
  im.src = catAnimationDict[cat.name][cat.state][0]; // TODO: use all frames using frame arg
  im.onload = () => {
    imageCount += 1;
    if(imageCount == drawState.cats.length) { 
        allLoaded(); 
    };
  };
  catImages.push([im, drawState.surfaces[cat.position].x, drawState.surfaces[cat.position].y]);
});
};

const drawToyPlaceAreas = (roomState, rectDimX, rectDimY) => {
  if(roomState) {
    canvas = document.getElementById("toy-place-canvas");

    if (!canvas) return;
    const context = canvas.getContext("2d");
    context.fillStyle = "#808080";

    context.globalAlpha = 0.5;

    

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
  const toysize = 20;
  canvas = document.getElementById("toy-canvas");

  if (!canvas) return;
  const context = canvas.getContext("2d");

  const im = new Image(toysize + 20, toysize + 20); // extra room for bigger toys; j position on the artboard
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
    let xOffset = -30;
    let yOffset = 20;
    context.drawImage(im, bbox.x - toysize/2 + xOffset, bbox.y - toysize/2 + yOffset, toysize, toysize);
  };



  

}

export { updateCanvasState, drawToyPlaceAreas, clearToyPlaceAreas, drawToy, convertCoord }