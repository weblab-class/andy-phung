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

  export const drawCanvas = (drawState) => { // canvas dims are 1200 x 250; receives update.gameState.canvas
    // use id of canvas element in HTML DOM to get reference to canvas object
    canvas = document.getElementById("game-canvas");
    if (!canvas) return;
    const context = canvas.getContext("2d");
    let catImage;

    drawState.cats.forEach(cat => {
      catImage = new Image(400, 400);
      let { drawX, drawY } = convertCoord(drawState.surfaces[cat.position].x, drawState.surfaces[cat.position].y);
      catImage.onload = () => {
          context.drawImage(catImage, drawX, drawY, 40, 40);
          //console.log("is this running");
      };
      catImage.src = "https://cdn.discordapp.com/attachments/754243466241769515/1199220563772710933/snowball.png";
    });
    
    /*
    // draw everything here
    
    */
  };