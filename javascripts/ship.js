class Ship{

  constructor(canv,ctx){
    this.ctx = ctx;
    this.canv = canv;
    this.x = this.canv.width / 2,
    this.y = this.canv.height - 40;
    this.s = 25;
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);

  }

  draw(){
    this.ctx.strokeStyle = "red",
    this.ctx.lineWidth = 50 / 20;

    this.ctx.beginPath();
    this.ctx.moveTo( //nose of this
      this.x,
      this.y - 4/3 * this.s
    );

    this.ctx.lineTo( //rear left
      this.x - this.s,
      this.y + this.s * (2/3)
    );

    this.ctx.lineTo( //rear right
      this.x + this.s,
      this.y + this.s * (2/3)
    );
    this.ctx.closePath();
    this.ctx.stroke();
  }

  moveLeft(){
    if(this.x > 0 + this.s + 10){
      this.x = this.x - 10;
    }
  }
  moveRight(){
    if(this.x < this.canv.width - this.s -  10){
      this.x = this.x + 10;
    }
  }

  move(e){
    switch (e.keyCode) {
      case 37:
        this.moveLeft();
        break;
      case 39:
        this.moveRight();
        break;
      default:

    }
  }


}

export default Ship;
