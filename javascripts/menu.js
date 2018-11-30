class Menu{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
  }

  draw(){
    this.ctx.strokeStyle = "red"
    this.ctx.font = "30px Arial";
    this.ctx.strokeText("Be Fast! Be Quick!",this.canv.width / 3 + 60,this.canv.height / 3);

    this.ctx.font = "20px Arial";
    this.ctx.strokeText("Press Any Key to Start!",this.canv.width / 3 + 80, 2 * this.canv.height / 3);
  }
}

export default Menu;
