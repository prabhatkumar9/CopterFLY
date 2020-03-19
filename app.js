window.onload = function () {

    const canvas = document.getElementById("canvas");
    canvas.width = innerWidth;
    canvas.height = 600;

    const context = canvas.getContext("2d");

    const environment = new Environment(canvas, context);
    const copter = new Copter(350,300,context);
    
    gameLoop();

    context.fillStyle = '#FFFFFF';

    function gameLoop() {
        context.fillRect(0, 0, context.width, context.height);
        environment.update();
        environment.render();
        copter.update();
        copter.render()
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
    this.bgWidth = 700;
    this.gbPos = 0;
    this.bgSpeed = 2;
    this.bgImg = document.getElementById('bg');
};
Environment.prototype.update = function () {
    this.bgPos -= this.bgSpeed;
    // console.log(this.bgPos);
    
    if(this.bgPos <= -700){
        this.bgPos=0;
    }
};
Environment.prototype.render = function () {
    for (let i = 0; i <= this.c.width/this.bgWidth+1; i++){
        this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
    }
};




// COpter 
const Copter = function(x, y, ctx){
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.velY = 0;
    this.width = 80;
    this.height = 80;
    this.ticks = 0;
    this.flyIndex = 0;
   
    this.fly = [document.getElementById('copter1'),
                document.getElementById('copter2'),
                document.getElementById('copter3')];
    var self = this;
    window.addEventListener('keydown', function(e){
      if (e.keyCode === 32){
        self.velY = -10;
      }
    });
  };
  Copter.prototype.update = function(){
    this.ticks++;
    if (this.ticks % 15 === 0) {this.flyIndex = (this.flyIndex+1) % this.fly.length};
    if(this.y <= 550)
    {
        this.y += this.velY;
        this.velY += 1;
    }
  };
  
  Copter.prototype.render = function(){
    let renderX = this.x - this.width/2;
    let renderY = this.y - this.height/2;
    this.ctx.drawImage(this.fly[this.flyIndex], renderX, renderY);
    
  };
