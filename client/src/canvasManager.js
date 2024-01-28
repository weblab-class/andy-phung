import { catAnimationDict } from "./components/modules/data";

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

export const updateCanvasState = (drawState, frame) => { // canvas dims are 1200 x 250; receives update.gameState.canvas
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
  const im = new Image(452, 361);
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