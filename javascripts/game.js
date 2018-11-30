import Ship from "./ship.js";
import Obstacle from "./obstacle.js";
class Game{

  constructor(){

    this.canv = document.getElementById("gameCanvas");
    this.ctx = this.canv.getContext("2d");
    this.ship = new Ship(this.canv,this.ctx);
    this.obstacle = new Obstacle(this.canv,this.ctx);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.update = this.update.bind(this);

    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);

    this.play();

  }

  play(){
    setInterval(this.update, 1000 / 30);
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
    this.ship.draw();
    this.obstacle.draw();
  }






}

new Game();
