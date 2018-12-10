class Music{

  constructor(canv,ctx){
    this.canv = canv;
    this.ctx = ctx;
    this.audio = document.getElementById('music');
  }

  draw(){
    this.ctx.moveTo(0,0);
    this.ctx.strokeStyle = "orange"
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Mute", 40, 40);
  }

  drawPlay(){
    this.ctx.moveTo(0,0);
    this.ctx.strokeStyle = "orange"
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Music", 40, 40);
  }

  play(){
    this.audio.play();
  }

  pause(){
    this.audio.pause();
  }


}
export default Music;
