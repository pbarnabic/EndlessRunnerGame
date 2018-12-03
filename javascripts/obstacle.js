class Obstacle{

  constructor(canv,ctx,speed,length){
    this.canv = canv;
    this.ctx = ctx;
    this.w = Math.floor(Math.random()*(10)+5);
    this.h = 40;
    this.leftWall = 360;
    length === 0 ? this.leftWallOffset = 120 : this.leftWallOffset = Math.floor(Math.random()*(240));
    this.x = this.leftWall + this.leftWallOffset;
    this.y = 0;
    this.multiplier = this.findMultiplier();
    this.speed = speed;

  }

  move(){
    let multiplier;
    this.x > this.canv.width / 2 ? multiplier = -3/2 : multiplier = 3/2;
    this.x == this.canv.width / 2 ? multiplier = 0 : multiplier;
    this.y += this.speed;
    this.x -= (4/3 * this.speed)/5 * multiplier;
    this.w += (1 + Math.sqrt(this.y)/240);
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
