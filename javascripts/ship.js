class Ship{

  constructor(canv,ctx,voice){
    this.ctx = ctx;
    this.canv = canv;
    this.x = this.canv.width / 2,
    this.y = this.canv.height - 40;
    this.s = 25;
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.voice = voice;

  }

  draw(){
    this.ctx.strokeStyle = "orange",
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

    if(this.x > 0 + this.s + 10 && this.x > this.canv.width * 2/8 - 40){
      if(this.voice){
        this.x -= 150;
      }else{
        this.x -= 60;
      }

    }
  }
  moveRight(){
    if(this.x < this.canv.width - this.s -  10 && this.x < this.canv.width * 6/8 + 40){
      if(this.voice){
        this.x += 150
      }else{
        this.x += 60
      }
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
