import Ship from "./ship.js";
import Obstacle from "./obstacle.js";
import Side from "./side.js";
import Scorebox from "./scorebox.js";
import Menu from "./menu.js";
import RoadLine from "./roadLines.js";
import Music from "./music.js"

class Game{

  constructor(){

    this.canv = document.getElementById("gameCanvas");
    this.ctx = this.canv.getContext("2d");
    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);

    this.ship = new Ship(this.canv,this.ctx);
    this.scoreBox = new Scorebox(this.canv, this.ctx);
    this.obstacles = [];
    this.side = new Side(this.canv,this.ctx);
    this.menu = new Menu(this.canv,this.ctx);
    this.roadLine = new RoadLine(this.canv,this.ctx);
    this.music = new Music(this.canv,this.ctx);

    this.keyDown = this.keyDown.bind(this);
    this.click = this.click.bind(this);
    this.update = this.update.bind(this);
    this.createNewObstacles = this.createNewObstacles.bind(this);
    this.play = this.play.bind(this);

    this.counter = 0;
    this.hasCollided = this.hasCollided.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.isOver = true;
    this.interval = null;
    this.muted = false;

    document.addEventListener("keydown", this.keyDown);
    this.canv.addEventListener("click", this.click);
    this.menu.draw();
    this.music.draw();
  }

  play(){
    this.counter = 0;
    this.obstacles = [];
    this.interval = setInterval(this.update, 1000 / 60);
    this.scoreBox.updateScore(this.counter);
  }

  keyDown(e){
    if(e.keyCode == 77){
      this.muted ? this.muted = false : this.muted = true;
    }
    if (this.isOver){
      this.isOver = false;
      this.play();

    }else{
      this.ship.move(e);
    }
  }

  click(e){
    
    if(e.clientX <= 430 && e.clientY <= 140){
      this.muted ? this.muted = false : this.muted = true;
    }
    if(!this.muted){
      if (this.isOver == true){
        this.menu.draw();
      }
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
      this.ctx.fillStyle = "orange";
      this.side.drawLeft();
      this.side.drawRight();
      this.ship.draw();
      this.scoreBox.draw();
      this.roadLine.draw();
      this.side.drawInnerLeft();
      this.side.drawInnerRight();
      this.music.play();
      this.music.draw();

    }else{
      if (this.isOver == true){
        this.menu.draw();
      }
      this.music.pause();
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
      this.side.drawLeft();
      this.side.drawRight();
      this.ship.draw();
      this.scoreBox.draw();
      this.roadLine.draw();
      this.side.drawInnerLeft();
      this.side.drawInnerRight();
      this.music.drawPlay();
    }
  }


  update(){
    if(!this.muted){
      this.music.play();
      this.music.draw();
    }else{
      this.music.pause();

    }

    if(!this.isOver){
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
      this.side.drawLeft();
      this.side.drawRight();
      this.ship.draw();
      this.scoreBox.draw();
      this.roadLine.draw();
      this.roadLine.move();
      this.side.drawInnerLeft();
      this.side.drawInnerRight();
      this.muted ? this.music.drawPlay() : this.music.draw();


      for(var i = this.obstacles.length - 1; i >= 0; i --){
        if(this.hasCollided(this.obstacles[i])){
          this.handleCollision();
          break;
        }
        if(this.obstacles[i].isOffscreen()){
          this.obstacles.splice(1,i);
        }else{
          this.obstacles[i].move();
          this.obstacles[i].draw();
        }
      }
      if(this.obstacles.length < 5 && this.counter > 60 && this.counter % 60 == 0){
        this.createNewObstacles();
      }
      this.counter += 1;
      this.scoreBox.updateScore(this.counter);
    }
  }

  createNewObstacles(){
    var speed = 3;
    if(this.counter > 500){
      speed = 9;
    }else if(this.counter > 1500){
      speed = 18;
    }else if(this.counter > 3000){
      speed = 21;
    }else{
      speed = 9;
    }
    let obstacle = new Obstacle(this.canv,this.ctx,speed,this.obstacles.length);
    this.obstacles.push(obstacle);
  }

  hasCollided(obstacle){
    let dist = this.calcDistance(obstacle,this.ship);
    if (dist < this.ship.s + obstacle.w && obstacle.y <= this.ship.y){
      return true;
    }
    return false;
  }

  handleCollision(){
    this.isOver = true;
    this.menu.draw();
    clearInterval(this.interval);
  }

  calcDistance(ob1,ob2){
    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y,2));
  }

}

new Game();
