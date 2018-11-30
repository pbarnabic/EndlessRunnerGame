class Obstacle{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
    //Math.floor(Math.random()*(max-min+1)+min) generates a random number between x and y
    this.w = 60;
    this.h = 40;
    this.leftWall = 360;
    this.x = Math.floor(Math.random()*(159-this.h) + this.leftWall);
    this.y = 0;
  }

  move(){
    this.y += 4;
    this.x = this.x + 1;
    this.w += 16/16;
    this.h += 4/16;
  }

  draw(){
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();
  }


}


export default Obstacle;
