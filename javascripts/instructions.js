class Instructions{
  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
  }
  drawVoice(){
    this.ctx.font = "20px Arial";
    this.ctx.strokeText("Say 'Left' or 'Right' to move the ship",this.canv.width / 3 , 2 * this.canv.height / 3);
  }
  drawRegular(){
    this.ctx.font = "20px Arial";
    this.ctx.strokeText("Use the Left and Right Arrow Keys to Dodge Obstacles",this.canv.width / 4, 2 * this.canv.height / 3);

  }
}

export default Instructions;
