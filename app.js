window.onload = function () {

    const canvas = document.getElementById("canvas");
    canvas.width = innerWidth;
    canvas.height = 600;

    const context = canvas.getContext("2d");

    const environment = new Environment(canvas, context);
    
    gameLoop();

    context.fillStyle = '#FFFFFF';

    function gameLoop() {
        context.fillRect(0, 0, context.width, context.height);
        environment.update();
        environment.render();
        
        window.requestAnimationFrame(gameLoop);
    }
    // window.requestAnimationFrame(gameLoop);

};

// checking image placement******
// context.fillRect(20, 20, 20, 20);
// context.fillStyle = "green";
// context.fillRect(100, 20, 20, 20);
// context.fillStyle = "green";
// context.fillRect(200, 20, 20, 20);
// context.fillStyle = "green";
// context.strokeRect(300, 20, 20, 20);
// context.strokeRect(400, 20, 20, 20);
// // context.drawImage(document.getElementById("helicopter1"), 500,20);
// // context.drawImage(document.getElementById("helicopter"), 700,20


////////////////////////////////////////////////////////////////////////////////////

// create a environment class
const Environment = function (canvas, context) {
    this.c = canvas;
    this.ctx = context;
    this.bgPos = 0;
    this.bgWidth = 450;
    this.gbPos = 0;
    this.bgSpeed = 10;
    this.bgImg = document.getElementById('bg');
};
Environment.prototype.update = function () {
    this.bgPos -= this.bgSpeed;
    // console.log(this.bgPos);
    
    if(this.bgPos <= -150){
        this.bgPos=0;
    }
};
Environment.prototype.render = function () {
    for (let i = 0; i <= this.c.width/this.bgWidth+1; i++){
        this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
    }
};
