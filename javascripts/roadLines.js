class RoadLine{

  constructor(canv, ctx, y1 = 0){
    this.canv = canv;
    this.ctx = ctx;
    this.x1 = this.canv.width * 1/2;
    this.x2 = this.canv.width * 1/2;
    this.y1 = y1;
    this.y2 = this.y1 + 50;
    this.dif = 7;
  }

  draw(){

    this.ctx.beginPath();
    this.ctx.moveTo(this.x1,this.y1);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.stroke();

  }

  move(){
    if(this.y1 < this.canv.height){
      this.y1 += 18;
      this.y2 = this.y1 - this.dif;
      if(this.dif < 49){
        this.dif += (this.dif)/7;
      }
    }else{
      this.y1 = 0;
      this.y2 = this.y1 + 50;
      this.dif = 7;
    }
  }



}


export default RoadLine;
