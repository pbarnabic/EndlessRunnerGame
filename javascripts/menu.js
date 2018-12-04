class Menu{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
  }

  draw(){
    this.ctx.strokeStyle = "red"
    this.ctx.font = "30px Arial";
    this.ctx.strokeText("Star Runner!",this.canv.width / 3 + 80,this.canv.height / 3);

    this.ctx.font = "20px Arial";
    this.ctx.strokeText("Press Any Key to Start!",this.canv.width / 3 + 65, 2 * this.canv.height / 3);
  }
}

export default Menu;
