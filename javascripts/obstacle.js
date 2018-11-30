class Obstacle{

  constructor(canv,ctx,speed){
    this.canv = canv;
    this.ctx = ctx;
    //Math.floor(Math.random()*(max-min+1)+min) generates a random number between x and y
    this.w = Math.floor(Math.random()*(10)+20);
    this.h = 40;
    this.leftWall = 360;
    this.leftWallOffset = Math.floor(Math.random()*(240))
    this.x = this.leftWall + this.leftWallOffset;
    this.y = 0;
    this.multiplier = this.findMultiplier();
    this.speed = speed;

  }

  move(){
    this.y += this.speed * this.canv.width/this.canv.height;
    this.x += this.speed * this.canv.width/this.canv.height;
    this.leftWall += (7/8)/60;
    this.x = +this.leftWall + this.leftWallOffset;
    this.w += 1/3;
    this.h += 1/3;
  }

  draw(){
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.w,0, Math.PI * 2, false);
    this.ctx.fill();
  }

  isOffscreen(){
    if (this.y > this.canv.height + this.w){
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
