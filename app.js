// main window function 
window.onload = function () {

  // getting canvas from html page
  // set height and width of canvas  
  const canvas = document.getElementById("canvas")
  canvas.width = innerWidth;
  canvas.height = 600;

  // create 2d context plane 
  const context = canvas.getContext("2d");

  // environment object created
  const environment = new Environment(canvas, context);

  // copter object created 
  const copter = new Copter(300, 300, context);

  // clouds position
  const clouds = [];
  setInterval(function () {
    let cloudset = genrandomClouds(context, canvas.width, canvas.height);
    clouds.push(cloudset.top, cloudset.bottom);
  }, 3000);

  // test clouds
  // const cloud2 = new Cloud(400,400,50,5,context);
  // const cloud3 = new Cloud(750,300,50,5,context);

  gameLoop();

  context.fillStyle = "#FFFFFF";

  // game loop infinite 
  function gameLoop() {
    context.fillRect(0, 0, context.width, context.height);
    environment.update();
    environment.render();
    // clouds on canvas
    clouds.forEach(function (cloud) {
      cloud.update();
      cloud.render();
      // console.log(clouds);
    });
    copter.update();
    copter.render();

    // collision detection called 
    if (collisionDetect(copter, clouds) === true) {
      alert("you loose");
      window.location = '/';
    }

    // create animation and callback
    window.requestAnimationFrame(gameLoop)

  }


  // function generates clouds on canvas
  function genrandomClouds(context, canvasWidth, canvasHeight) {
    let lenTop = Math.round(Math.random() * 200 + 50);
    let lenBottom = canvasHeight - 250 - lenTop;
    let rtnvalue = {};
    rtnvalue.top = new Cloud(canvasWidth, 15, lenTop, 4, context);
    rtnvalue.bottom = new Cloud(
      canvasWidth,
      canvasHeight - lenBottom - 15,
      lenBottom,
      4,
      context
    );
    return rtnvalue;
  }

  // function to detect collision
  function collisionDetect(copter, clouds) {
    for (let i = 0; i < clouds.length; i++) {
      let e = clouds[i];
      let highcloud = e.ypos <= 0;
      let x0 = e.xpos,
        x1 = e.xpos + e.width;
      if (highcloud) {
        let y0 = e.ypos + e.length;
        let alpha = copter.x;
        let beta = copter.y - copter.height / 2;
        if (alpha > x0 && apha < x1 && beta < y0) {
          return true;
        }

      } else {
        let y2 = e.ypos;
        let a = copter.x;
        let b = copter.y + copter.height / 2;
        if (a > x0 && a < x1 && b > y2) {
          return true;
        }
        return false;
      }

    }
    return false;
  }

};



////////////////////////////////////////////////////////////////////////////////////

// create a environment constructor
const Environment = function (canvas, context) {
  this.c = canvas;
  this.ctx = context;
  this.bgPos = 0;
  this.bgWidth = 700;
  this.gbPos = 0;
  this.bgSpeed = 4;
  this.bgImg = document.getElementById("bg")
};
// update environment position
Environment.prototype.update = function () {
  this.bgPos -= this.bgSpeed;
  // console.log(this.bgPos);
  if (this.bgPos <= -700) {
    this.bgPos = 0;
  }
};

// draw image on canvas using render function 
Environment.prototype.render = function () {
  for (let i = 0; i <= this.c.width / this.bgWidth + 1; i++) {
    this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
  };
}

// COpter constructor create
const Copter = function (x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.velY = 0;
  this.width = 80;
  this.height = 80;
  this.ticks = 0;
  this.flyIndex = 0;

  this.fly = [
    document.getElementById("copter1"),
    document.getElementById("copter2"),
    document.getElementById("copter3")
  ];

  // spacebar identify and update y position 
  var self = this;
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      self.velY = -8;
    }
  });
}

// update copter position 
Copter.prototype.update = function () {
  this.ticks++;
  if (this.ticks % 15 === 0) {
    this.flyIndex = (this.flyIndex + 1) % this.fly.length;
  }
  if (this.y <= 550) {
    this.y += this.velY;
    this.velY += 1;
  }
}

// copter draw on canvas using render funtion 
Copter.prototype.render = function () {
  let renderX = this.x - this.width / 2;
  let renderY = this.y - this.height / 2;
  this.ctx.drawImage(this.fly[this.flyIndex], renderX, renderY);
}


//   creating clouds constructor
const Cloud = function (xpos, ypos, length, speed, context) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.length = length;
  this.ctx = context;
  this.speed = speed;
  this.width = 130;
};


// update cloud position 
Cloud.prototype.update = function () {
  this.xpos -= this.speed;
};

// draw clouds on canvas 
Cloud.prototype.render = function () {

  // formation of clouds
  this.ctx.fillStyle = "Gray";
  this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length);
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(
    this.xpos + 2,
    this.ypos + 2,
    this.width - 2,
    this.length - 2
  );

}