# Star Runner

Star Runner is an endless-runner game in which the user must use the left and right arrow keys to dodge randomly generated obstacles that lie in their path.

Star Runner is built using JavaScript (ES6), Canvas, HTML5, and CSS. A live version of this game can be found at https://pbarnabic.github.io/EndlessRunnerGame/

It's construction begins with the initialization of a Canvas element.

```
<!-- index.html -->

<div id="alignment-div">
      <canvas id="gameCanvas" width="960" height="360"></canvas>
</div>
```

The height and width were chosen as to help create a sense of depth. Note: this project does not use three.js or any other 3D libraries.

From the above canvas element, the game is built in an object oriented fashion.

The main class, the Game class, upon its initialization grabs the canvas element by its Id. From there, it builds the following objects:
  * Ship
  * Scorebox
  * Side
  * Menu
  * RoadLine

 Note that the RoadLine is a reference point that moves vertically across the screen from top to bottom at a regular pace to create the sense that the ship is moving. The Side Object is responsible for the creation of four lines, two of which go North-East and another two that go North-West. These side lines both indicate where the ship may and may not move and serve as addiitonal reference point by which a sense of motion is instilled in the user.

 An event listener, ```keyDown```, is added and serves one of two purposes depending on whether the game is in play or not. If the game is in play, the keyDown event results in the ship's move instance method being called. If the game is not in play, keyDown is responsible for beginning the new game through calling the play method of the game instance.
 ```
 //game.js

 keyDown(e){
    if (this.isOver){
      this.isOver = false;
      this.play();

    }else{
      this.ship.move(e);
    }
  }
  ```

  The Game class' ```play``` method is responsible for restarting the counter that is used to determine the user's score to 0, clearing all obstacles from the board, setting an Interval by which the movement in the game is generated, and updating the scoreboard to reflect the updated counter's value of zero.

  ```
   //game.js

  play(){
    this.counter = 0;
    this.obstacles = [];
    this.interval = setInterval(this.update, 1000 / 60);
    this.scoreBox.updateScore(this.counter);
  }
  ```

  You'll notice that the callback provided to setInterval is ```this.update``` a function we will examine further in the lines that follow. The interval provided, 1000/60, can be thought of as the framerate.

  The game class' ```update``` instance method is perhaps the single most important method in this program. It alone is responsible for the creation and movement of the obstacles, the movement of the ship, ensuring the game is not over, and incrementing the score.

  How does it do this?

  Each time it is called by ```setInterval```, ```update``` first redraws the canvas and all of the objects that appear in it.

  ```
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.canv.width,this.canv.height);
  this.side.drawLeft();
  this.side.drawRight();
  this.side.drawInnerLeft();
  this.side.drawInnerRight();
  this.ship.draw();
  this.scoreBox.draw();
  this.roadLine.draw();
  this.obstacles[i].draw();
  ```

```update``` then calls ```move``` on each of the variably positioned objects.

  ```
  this.roadLine.move();
  this.obstacles[i].move();
  ```
  It should be noted that the obstacles are stored in an array instance belonging to the game class. The ```update``` method checks to see if the length of this array is less than 5, in which case it creates another obstacle. For more information pertaining to the creation of obstacles, checkout *obstacle.js* found in the *javascripts* folder.

  ```
  if(this.obstacles.length < 5 && this.counter > 60 && this.counter % 60 == 0){
        this.createNewObstacles();
      }
  ```

  The condition in the above snippet that checks to see if the counter is greater than 60 translates to the user having one second of leeway before any obstacles are generated upon the commencement of the game.

  As mentioned earlier, ```update``` is responsible for ensuring that the game is not over. The game is over when the user's ship collides with an obstacle. To verify this is not the case, for each obstacle in the obstacles array, the method ```hasCollided``` is called.

  ```
   hasCollided(obstacle){
     let dist = this.calcDistance(obstacle,this.ship);
     if (dist < this.ship.s + obstacle.w && obstacle.y <= this.ship.y){
       return true;
     }
     return false;
  }
  ```

  ```hasCollided``` takes in an obstacle as argument. It then uses the distance formula to calculate the distance between the object and the ship. If the distance is less than the size of the ship plus the radius of the obstacle and the vertical coordinate of the obstacle is less than the y coordinate of the ship, the ship has collided, ```handleCollision``` is called and the game is terminated.

  ```move``` works slightly differently in the obstacles and the RoadLine, but the all it does is change the x and y position from which the elements are drawn in canvas. An obstacles starting y coordinate changing by 12 pixels every second creates the sense that it is moving. By moving 1/5 of a pixel every 16 milliseconds this motion seems smoother.

  I hope you enjoy playing *Star Runner* and for more information, I encourage you delve into the code.
