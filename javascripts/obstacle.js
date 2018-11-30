class Obstacle{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
    //Math.floor(Math.random()*(max-min+1)+min) generates a random number between x and y
    this.w = Math.floor(Math.random()*(110)+30);
    this.h = 40;
    this.leftWall = 360;
    this.leftWallOffset = Math.floor(Math.random()*(80))
    this.x = this.leftWall + this.leftWallOffset;
    this.y = 0;
    this.multiplier = this.findMultiplier();

  }

  move(){
    this.y += 12 * this.canv.height/this.canv.width;
    this.leftWall *= this.multiplier;
    this.x = this.leftWall + this.leftWallOffset;
    this.w += 1;
    this.h += 1/4;
  }

  draw(){
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();
  }

  isOffscreen(){
    if (this.y > this.canv.height){
      return true
    }else{
      return false;
    }
  }

  findMultiplier(){
    let random = Math.random();
    let multiplier;
    random > .5 ? multiplier = 955/960 : multiplier = 965/960;
    random > .9 ? multiplier = 1: multiplier;
    random < .1 ? multiplier = 950/960: multiplier;
    return multiplier;
  }

}




export default Obstacle;
