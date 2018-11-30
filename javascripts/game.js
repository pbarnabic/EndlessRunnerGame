import Ship from "./ship.js";
import Obstacle from "./obstacle.js";
import Side from "./side.js";
class Game{

  constructor(){

    this.canv = document.getElementById("gameCanvas");
    this.ctx = this.canv.getContext("2d");
    this.ship = new Ship(this.canv,this.ctx);
    this.obstacles = [];
    this.side = new Side(this.canv,this.ctx);
    this.keyDown = this.keyDown.bind(this);
    this.update = this.update.bind(this);
    this.createNewObstacles = this.createNewObstacles.bind(this);
    this.counter = 0;
    this.hasCollided = this.hasCollided.bind(this);
    this.isOver = false;

    document.addEventListener("keydown", this.keyDown);


    this.play();

  }

  play(){
    setInterval(this.update, 1000 / 60);
  }

  keyDown(e){
    this.ship.move(e);
  }


  update(){

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
    this.side.drawLeft();
    this.side.drawRight();
    this.ship.draw();
    if(!this.isOver){
      for(var i = this.obstacles.length - 1; i >= 0; i --){
        if(this.hasCollided(this.obstacles[i])){
          this.isOver = true;
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
      console.log(this.counter);
    }
  }

  createNewObstacles(){
    var speed = 3;
    if(this.counter > 500){
      speed = 9;
    }else if(this.counter > 1500){
      speed = 12;
    }else if(this.counter > 3000){
      speed = 15;
    }else{
      speed = 9;
    }
    let obstacle = new Obstacle(this.canv,this.ctx,speed);
    this.obstacles.push(obstacle);
  }

  hasCollided(obstacle){
    let dist = this.calcDistance(obstacle,this.ship);
    if (dist < this.ship.s + obstacle.w && obstacle.y <= this.ship.y){
      return true;
    }
    return false;
  }

  calcDistance(ob1,ob2){
    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y,2));
  }


}

new Game();
