let canvas; 

const convertCoord = (x, y) => {
    if (!canvas) {
        console.log("wtf");
        return;
    }
    return {
      drawX: x,
      drawY: canvas.height - y,
    };
  };

  export const drawCanvas = (drawState) => {
    // use id of canvas element in HTML DOM to get reference to canvas object
    canvas = document.getElementById("game-canvas");
    if (!canvas) return;
    const context = canvas.getContext("2d");
    
    // draw everything here
    let toy = new Image(4000, 4000);
    toy.onload = () => {
        context.drawImage(toy, 600, 125);
        //console.log("is this running");
    };
    toy.src = "https://cdn.discordapp.com/attachments/754243466241769515/1198089397669724251/mini_laser_icon.png";
  };