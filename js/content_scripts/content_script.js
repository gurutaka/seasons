$("body").prepend('<div id="season"></div>');

const w = $("#season").width();
const h = $("#season").height();
const num = 50;

chrome.runtime.onMessage.addListener(function(msg) {
  $("#season").empty();

  switch (msg.id) {
    case "spring":
      new p5(spring, "season");
      break;

    case "summer":
      new p5(summer, "season");
      break;

    case "autumn":
      new p5(autumn, "season");
      break;

    case "winter":
      new p5(winter, "season");
      break;
  }
});

const spring = function(p) {
  let fubuki = [];
  let colors = [];

  p.setup = function() {
    p.createCanvas(w, h);
    p.background(0);

    for (let i = 0; i < num; i++) {
      fubuki.push(new p.Sakura());
    }

    p.noStroke();

    colors.push(p.color(244, 191, 252, 150));
    colors.push(p.color(255, 219, 248, 150));
    colors.push(p.color(246, 204, 252, 150));
  };

  p.draw = function() {
    p.clear();

    fubuki.forEach(el => {
      el.draw();
      el.move();
    });
  };

  p.Sakura = function() {
    let n = 4;
    let A, md, r, x, y;

    this.xDef = p.random(w);

    this.xAmp = p.random(50, 100);
    this.xSpeed = p.random(0.5, 1.5);
    this.xTheta = p.random(360);

    this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
    this.oy = p.random(h);
    this.rotateT = p.random(360);
    this.size = p.random(20, 50);

    this.ySpeed = this.size / 30;
    this.sizeYScale = 1;
    this.sizeYT = p.random(360);
    this.sizeYSpeed = this.size / 30;
    this.c = p.floor(p.random(3));

    this.off = 0;

    this.calcH = function(x) {
      if (x < 0.8) {
        return 0;
      } else {
        return 0.8 - x;
      }
    };

    this.draw = function() {
      p.fill(colors[this.c]);

      p.push();
      p.translate(this.ox, this.oy);
      p.rotate(p.radians(this.rotateT));
      p.beginShape();
      for (let t = 0; t < 360 / 4; t++) {
        A = (n / p.PI) * p.radians(t);

        md = p.floor(A) % 2;

        r = p.pow(-1, md) * (A - p.floor(A)) + md;

        R = r + 2 * this.calcH(r);

        x = this.size * R * p.cos(p.radians(t));
        y = this.size * this.sizeYScale * R * p.sin(p.radians(t));

        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
      p.pop();
    };

    this.move = function() {
      this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
      this.xTheta += this.xSpeed;

      this.oy += this.ySpeed;
      this.sizeYT += this.sizeYSpeed;
      this.sizeYScale = p.abs(p.sin(p.radians(this.sizeYT)));

      //回転,noise関数
      let rotateOff = p.map(p.noise(this.off), 0, 1, -3, 3);
      this.rotateT += rotateOff;

      this.off += 0.05;

      if (this.oy > h + this.size) {
        this.oy = -this.size;
      }
    };
  };
};

let summer = function(p) {
  let fubuki = [];
  let colors = [];

  p.setup = function() {
    p.createCanvas(w, h);
    p.background(0);

    for (let i = 0; i < num; i++) {
      fubuki.push(new p.Leaf());
    }

    p.noStroke();

    colors.push(p.color(123, 141, 66, 150));
    colors.push(p.color(147, 202, 118, 150));
    colors.push(p.color(57, 97, 34, 150));
  };

  p.draw = function() {
    p.clear();

    fubuki.forEach(el => {
      el.draw();
      el.move();
    });
  };

  p.Leaf = function() {
    const n = 4;
    let A, md, r, x, y;

    this.xDef = p.random(w);

    this.xAmp = p.random(50, 100);
    this.xSpeed = p.random(0.3, 1.2);
    this.xTheta = p.random(360);

    this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
    this.oy = p.random(h);
    this.rotateT = p.random(360);
    this.size = p.random(20, 70);

    this.ySpeed = this.size / 40;
    this.sizeYScale = 1;
    this.sizeYT = p.random(360);
    this.sizeYSpeed = this.size / 50;
    this.c = p.floor(p.random(3));

    this.off = 0;

    this.draw = function() {
      p.fill(colors[this.c]);

      let xmax;
      let ymax;
      const veins = 0.75; //葉脈の長さ
      const petiole = -0.25; //葉柄の長さ
      const bulge = 1.2; //葉の膨らみ

      p.push();
      p.noStroke();
      p.translate(this.ox, this.oy);
      p.rotate(p.radians(this.rotateT));
      p.beginShape();

      for (let t = 0; t < 360 / n; t++) {
        A = (n / p.PI) * p.radians(t);

        md = p.floor(A) % 2;

        r = p.pow(-1, md) * (A - p.floor(A)) + md;

        R = r;

        x = this.size * R * p.cos(bulge * p.radians(t));
        y = this.size * this.sizeYScale * R * p.sin(p.radians(t));

        if (t == 45) {
          xmax = x;
          ymax = y;
        }

        p.vertex(x, y);
      }

      p.endShape(p.CLOSE);
      p.stroke(153); // 線の色
      p.strokeWeight(0.5); // 線の太さ
      p.line(0, 0, xmax * veins, ymax * veins);

      p.stroke(colors[this.c]); // 線の色
      p.strokeWeight(2); // 線の太さ
      p.line(0, 0, xmax * petiole, ymax * petiole);
      p.pop();
    };

    this.move = function() {
      this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
      this.xTheta += this.xSpeed;

      this.oy += this.ySpeed;
      this.sizeYT += this.sizeYSpeed;
      this.sizeYScale = p.abs(p.sin(p.radians(this.sizeYT)));

      //回転,noise関数
      let rotateOff = p.map(p.noise(this.off), 0, 1, -3, 3);
      this.rotateT += rotateOff;

      this.off += 0.03;

      if (this.oy > h + this.size) {
        this.oy = -this.size;
      }
    };
  };
};

let autumn = function(p) {
  let fubuki = [];
  let colors = [];

  p.setup = function() {
    p.createCanvas(w, h);
    p.background(0);

    for (let i = 0; i < num; i++) {
      fubuki.push(new p.Momiji());
    }

    p.noStroke();

    colors.push(p.color(171, 74, 36, 150));
    colors.push(p.color(210, 94, 44, 150));
    colors.push(p.color(234, 85, 6, 150));
  };

  p.draw = function() {
    p.clear();

    fubuki.forEach(el => {
      el.draw();
      el.move();
    });
  };

  p.Momiji = function() {
    this.xDef = p.random(w);

    this.xAmp = p.random(50, 100);
    this.xSpeed = p.random(0.5, 1.5);
    this.xTheta = p.random(360);

    this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
    this.oy = p.random(h);
    this.rotateT = p.random(360);
    this.size = p.random(5, 10);

    this.ySpeed = this.size / 10;
    this.sizeYScale = 1;
    this.sizeYT = p.random(360);
    this.sizeYSpeed = this.size / 10;
    this.c = p.floor(p.random(3));

    this.off = 0;

    this.draw = function() {
      p.fill(colors[this.c]);

      p.push();
      p.noStroke();
      p.translate(this.ox, this.oy);
      p.rotate(p.radians(this.rotateT));
      p.beginShape();
      for (let theta = 0; theta < 360; theta++) {
        let x, y;

        r =
          -this.size *
          (1 + (9 / 10) * p.cos(p.radians(8 * theta))) *
          (1 + (1 / 10) * p.cos(p.radians(24 * theta))) *
          (9 / 10 + (1.0 / 10.0) * p.cos(p.radians(200 * theta))) *
          (1 + p.sin(p.radians(theta)));
        x = r * p.cos(p.radians(theta));
        y = r * this.sizeYScale * p.sin(p.radians(theta));

        p.vertex(x, y);
      }

      p.endShape(p.CLOSE);
      p.pop();
    };

    this.move = function() {
      this.ox = this.xDef + this.xAmp * p.sin(p.radians(this.xTheta));
      this.xTheta += this.xSpeed;

      this.oy += this.ySpeed;
      this.sizeYT += this.sizeYSpeed;
      this.sizeYScale = p.abs(p.sin(p.radians(this.sizeYT)));

      //回転,noise関数
      let rotateOff = p.map(p.noise(this.off), 0, 1, -2, 2);
      this.rotateT += rotateOff;

      this.off += 0.03;

      if (this.oy > h + this.size) {
        this.oy = -this.size;
      }
    };
  };
};

let winter = function(p) {
  let snowflakes = [];

  p.setup = function() {
    p.createCanvas(w, h);
    p.fill(240);
    p.noStroke();
  };

  p.draw = function() {
    p.clear();

    let t = p.frameCount / 100;

    for (let i = 0; i < p.random(3); i++) {
      snowflakes.push(new snowflake());
    }

    for (let flake of snowflakes) {
      flake.update(t);
      flake.display();
    }
  };

  function snowflake() {
    this.posX = 0;
    this.posY = p.random(-50, 0);
    this.initialangle = p.random(0, 2 * p.PI);
    this.size = p.random(2, 5);

    this.radius = p.sqrt(p.random(p.pow(w / 2, 2)));

    this.update = function(time) {
      let omega = 0.6; // 角速度
      let angle = omega * time + this.initialangle;
      this.posX = p.width / 2 + this.radius * p.sin(angle);

      this.posY += p.pow(this.size, 0.5);

      if (this.posY > h) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      p.ellipse(this.posX, this.posY, this.size);
    };
  }
};
