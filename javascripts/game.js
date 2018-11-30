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
    this.keyUp = this.keyUp.bind(this);
    this.update = this.update.bind(this);
    this.createNewObstacle = this.createNewObstacle.bind(this);
    this.counter = 0;

    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);

    this.play();

  }

  play(){
    setInterval(this.update, 1000 / 60);
  }

  keyDown(e){
    this.ship.move(e);
  }

  keyUp(e){
    console.log("keyup");
  }



  update(){

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
    this.ctx.strokeStyle = "red";
    this.side.drawLeft();
    this.side.drawRight();
    this.ship.draw();
    this.ctx.strokeStyle = "blue";

    for(var i = this.obstacles.length - 1; i >= 0; i --){
      if(this.obstacles[i].isOffscreen()){
        this.obstacles.splice(1,i);
      }else{
        this.obstacles[i].move();
        this.obstacles[i].draw();
      }
    }
    if(this.obstacles.length < 5 && this.counter > 60 && this.counter % 60 == 0){
      this.createNewObstacle();
    }
    this.counter += 1;

  }

  createNewObstacle(){
    let obstacle = new Obstacle(this.canv,this.ctx);
    let obstacle2 = new Obstacle(this.canv,this.ctx);
    this.obstacles.push(obstacle);
    this.obstacles.push(obstacle2);
  }






}

new Game();
