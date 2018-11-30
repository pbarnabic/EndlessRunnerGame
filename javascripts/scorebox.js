class Scorebox{
  constructor(canv,ctx){
    this.score = 0;
    this.canv = canv;
    this.ctx = ctx;
  }

  updateScore(newScore){
    this.score = newScore;
  }

  draw(){
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.strokeText(this.score,this.canv.width * 7/8,this.canv.height*1/8);
  }
}


export default Scorebox;
