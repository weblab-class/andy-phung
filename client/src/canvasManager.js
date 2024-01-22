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

  export const drawCanvas = (drawState) => { // canvas dims are 1200 x 250
    // use id of canvas element in HTML DOM to get reference to canvas object
    canvas = document.getElementById("game-canvas");
    if (!canvas) return;
    const context = canvas.getContext("2d");

    const { drawX, drawY }= convertCoord(100, 100);
    
    // draw everything here
    let toy = new Image(4000, 4000);
    toy.onload = () => {
        context.drawImage(toy, drawX, drawY);
        //console.log("is this running");
    };
    toy.src = "https://cdn.discordapp.com/attachments/754243466241769515/1198089397669724251/mini_laser_icon.png";
  };