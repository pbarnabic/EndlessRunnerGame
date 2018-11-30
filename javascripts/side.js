class Side{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
  }


  drawLeft(){
    this.ctx.beginPath();
    this.ctx.moveTo(1/8*this.canv.width,this.canv.height);
    this.ctx.lineTo(3/8*this.canv.width,0);
    this.ctx.stroke();
  }

  drawRight(){
    this.ctx.beginPath();
    this.ctx.moveTo(7/8*this.canv.width,this.canv.height);
    this.ctx.lineTo(5/8*this.canv.width,0);
    this.ctx.stroke();
  }




}


export default Side;
