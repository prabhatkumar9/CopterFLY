window.onload = function () {
  const canvas = document.getElementById("canvas")
  canvas.width = innerWidth;
  canvas.height = 600;

  const context = canvas.getContext("2d");

  const environment = new Environment(canvas, context);
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

    if (collisionDetect(copter, clouds)) {
      alert("you loose");
      window.location = '/';
    }

    window.requestAnimationFrame(gameLoop)

  }

  // window.requestAnimationFrame(gameLoop);
  // function generates clouds

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
        return false;
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

  }

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
  this.bgSpeed = 4;
  this.bgImg = document.getElementById("bg")
};
Environment.prototype.update = function () {
  this.bgPos -= this.bgSpeed;
  // console.log(this.bgPos);
  if (this.bgPos <= -700) {
    this.bgPos = 0;
  }
};

Environment.prototype.render = function () {
  for (let i = 0; i <= this.c.width / this.bgWidth + 1; i++) {
    this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
  };
}

// COpter
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
  var self = this;
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      self.velY = -8;
    }
  });
}

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

Copter.prototype.render = function () {
  let renderX = this.x - this.width / 2;
  let renderY = this.y - this.height / 2;
  this.ctx.drawImage(this.fly[this.flyIndex], renderX, renderY);
}

//   creating clouds

const Cloud = function (xpos, ypos, length, speed, context) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.length = length;
  this.ctx = context;
  this.speed = speed;
  this.width = 130;
};

Cloud.prototype.update = function () {
  this.xpos -= this.speed;
};

Cloud.prototype.render = function () {
  // this.ctx.save();
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
  // this.ctx.fillStyle = "green";
  // this.ctx.restore();
}