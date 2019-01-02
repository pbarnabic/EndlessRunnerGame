import Ship from "./ship.js";
import Obstacle from "./obstacle.js";
import Side from "./side.js";
import Scorebox from "./scorebox.js";
import Menu from "./menu.js";
import RoadLine from "./roadLines.js";
import Music from "./music.js";
import Instructions from "./instructions.js";

class Game{

  constructor(){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    window.SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList;
    this.recognition = new window.SpeechRecognition();
    this.recognition.continuous = true;
    let grammar = '#JSGF V1.0; grammar directions; public <direction> = left | right;'
    let speechRecognitionList = new window.SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;

    this.canv = document.getElementById("gameCanvas");
    this.ctx = this.canv.getContext("2d");
    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);

    this.scoreBox = new Scorebox(this.canv, this.ctx);
    this.obstacles = [];
    this.side = new Side(this.canv,this.ctx);
    this.menu = new Menu(this.canv,this.ctx);
    this.roadLine = new RoadLine(this.canv,this.ctx);
    this.music = new Music(this.canv,this.ctx);
    this.instructions = new Instructions(this.canv,this.ctx);

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
    this.voice = false;

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
    if(this.voice){
      this.recognition.start();
    }

    this.ship = new Ship(this.canv,this.ctx,this.voice);

  }

  keyDown(e){
    if(e.keyCode == 77){
      this.muted ? this.muted = false : this.muted = true;
    }
    if (this.isOver){
      if(e.keyCode == 86){
        this.voice = true;
        this.muted = true;
      }
      this.isOver = false;
      this.play();

    }else if(this.voice == false){
      this.ship.move(e);
    }
  }

  click(e){

    if(e.clientX <= 430 && e.clientY <= 140){
      this.muted ? this.muted = false : this.muted = true;
    }

    if (this.isOver == true){
      this.menu.draw();
    }

    if(!this.muted){
      this.music.play();
      this.music.draw();
    }else{
      this.music.pause();
      this.music.drawPlay();
    }

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
    this.ctx.fillStyle = "orange";

    this.side.draw();
    this.ship.draw();
    this.scoreBox.draw();
    this.roadLine.draw();

  }


  update(){
    if(!this.muted){
      this.music.play();
      this.music.draw();
    }else{
      this.music.pause();
    }

    if(!this.isOver){

      if(this.voice){
        this.recognition.onresult = (event) => {
          let command = event.results[event.resultIndex][0].transcript.split().pop();
          if(command.includes("l")){
            this.ship.moveLeft();
          }else if (command.includes("r")){
            this.ship.moveRight();
          }
        }
      }


      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
      this.side.draw();
      this.ship.draw();
      this.scoreBox.draw();
      this.roadLine.draw();
      this.roadLine.move();

      if(this.counter < 150){
        console.log("the counter is less than 1560");
        if(this.voice){
          this.instructions.drawVoice();
        }else{
          this.instructions.drawRegular();
        }
      }

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
    let obstacle = new Obstacle(this.canv,this.ctx,speed,this.obstacles.length,this.voice);
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
    this.recognition.abort();
    this.voice = false;
  }

  calcDistance(ob1,ob2){
    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y,2));
  }

}

new Game();
