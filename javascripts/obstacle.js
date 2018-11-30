class Obstacle{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
    //Math.floor(Math.random()*(max-min+1)+min) generates a random number between x and y
    this.w = Math.floor(Math.random()* 79 + 20);
    this.s = 40;
    this.x = Math.floor(Math.random()*(159-this.s) + 240);
    this.y = 0;
  }

  move(){

  }

  draw(){
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(this.x,this.y,this.w,this.w);
    this.ctx.stroke();
  }


}


export default Obstacle;
