/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascripts/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascripts/game.js":
/*!*****************************!*\
  !*** ./javascripts/game.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./javascripts/ship.js\");\n/* harmony import */ var _obstacle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./obstacle.js */ \"./javascripts/obstacle.js\");\n/* harmony import */ var _side_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./side.js */ \"./javascripts/side.js\");\n/* harmony import */ var _scorebox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scorebox.js */ \"./javascripts/scorebox.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu.js */ \"./javascripts/menu.js\");\n/* harmony import */ var _roadLines_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./roadLines.js */ \"./javascripts/roadLines.js\");\n\n\n\n\n\n\n\nclass Game{\n\n  constructor(){\n\n    this.canv = document.getElementById(\"gameCanvas\");\n    this.ctx = this.canv.getContext(\"2d\");\n    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);\n\n    this.ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canv,this.ctx);\n    this.scoreBox = new _scorebox_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.canv, this.ctx);\n    this.obstacles = [];\n    this.side = new _side_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.canv,this.ctx);\n    this.menu = new _menu_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.canv,this.ctx);\n    this.roadLine = new _roadLines_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.canv,this.ctx);\n\n    this.keyDown = this.keyDown.bind(this);\n    this.update = this.update.bind(this);\n    this.createNewObstacles = this.createNewObstacles.bind(this);\n    this.play = this.play.bind(this);\n\n    this.counter = 0;\n    this.hasCollided = this.hasCollided.bind(this);\n    this.handleCollision = this.handleCollision.bind(this);\n    this.isOver = true;\n    this.interval = null;\n\n    document.addEventListener(\"keydown\", this.keyDown);\n    this.menu.draw();\n  }\n\n  play(){\n    this.counter = 0;\n    this.obstacles = [];\n    this.interval = setInterval(this.update, 1000 / 60);\n    this.scoreBox.updateScore(this.counter);\n  }\n\n  keyDown(e){\n    if (this.isOver){\n      this.isOver = false;\n      this.play();\n\n    }else{\n      this.ship.move(e);\n    }\n  }\n\n\n  update(){\n    if(!this.isOver){\n      this.ctx.fillStyle = \"black\";\n      this.ctx.fillRect(0,0,this.canv.width,this.canv.height);\n      this.side.drawLeft();\n      this.side.drawRight();\n      this.ship.draw();\n      this.scoreBox.draw();\n      this.roadLine.draw();\n      this.roadLine.move();\n      this.side.drawInnerLeft();\n      this.side.drawInnerRight();\n\n      for(var i = this.obstacles.length - 1; i >= 0; i --){\n        if(this.hasCollided(this.obstacles[i])){\n          this.handleCollision();\n          break;\n        }\n        if(this.obstacles[i].isOffscreen()){\n          this.obstacles.splice(1,i);\n        }else{\n          this.obstacles[i].move();\n          this.obstacles[i].draw();\n        }\n      }\n      if(this.obstacles.length < 5 && this.counter > 60 && this.counter % 60 == 0){\n        this.createNewObstacles();\n      }\n      this.counter += 1;\n      this.scoreBox.updateScore(this.counter);\n    }\n  }\n\n  createNewObstacles(){\n    var speed = 3;\n    if(this.counter > 500){\n      speed = 9;\n    }else if(this.counter > 1500){\n      speed = 18;\n    }else if(this.counter > 3000){\n      speed = 21;\n    }else{\n      speed = 9;\n    }\n    let obstacle = new _obstacle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.canv,this.ctx,speed,this.obstacles.length);\n    this.obstacles.push(obstacle);\n  }\n\n  hasCollided(obstacle){\n    let dist = this.calcDistance(obstacle,this.ship);\n    if (dist < this.ship.s + obstacle.w && obstacle.y <= this.ship.y){\n      return true;\n    }\n    return false;\n  }\n\n  handleCollision(){\n    this.isOver = true;\n    this.menu.draw();\n    console.log(this.interval);\n    clearInterval(this.interval);\n\n\n  }\n\n  calcDistance(ob1,ob2){\n    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y,2));\n  }\n\n}\n\nnew Game();\n\n\n//# sourceURL=webpack:///./javascripts/game.js?");

/***/ }),

/***/ "./javascripts/menu.js":
/*!*****************************!*\
  !*** ./javascripts/menu.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Menu{\n\n  constructor(canv,ctx){\n    this.canv = canv;\n    this.ctx = ctx;\n  }\n\n  draw(){\n    this.ctx.strokeStyle = \"red\"\n    this.ctx.font = \"30px Arial\";\n    this.ctx.strokeText(\"Be Fast! Be Quick!\",this.canv.width / 3 + 60,this.canv.height / 3);\n\n    this.ctx.font = \"20px Arial\";\n    this.ctx.strokeText(\"Press Any Key to Start!\",this.canv.width / 3 + 80, 2 * this.canv.height / 3);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Menu);\n\n\n//# sourceURL=webpack:///./javascripts/menu.js?");

/***/ }),

/***/ "./javascripts/obstacle.js":
/*!*********************************!*\
  !*** ./javascripts/obstacle.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Obstacle{\n\n  constructor(canv,ctx,speed,length){\n    this.canv = canv;\n    this.ctx = ctx;\n    this.w = Math.floor(Math.random()*(10)+5);\n    this.h = 40;\n    this.leftWall = 360;\n    length === 0 ? this.leftWallOffset = 120 : this.leftWallOffset = Math.floor(Math.random()*(240));\n    this.x = this.leftWall + this.leftWallOffset;\n    this.y = 0;\n    this.multiplier = this.findMultiplier();\n    this.speed = speed;\n\n  }\n\n  move(){\n    let multiplier;\n    this.x > this.canv.width / 2 ? multiplier = -3/2 : multiplier = 3/2;\n    this.x == this.canv.width / 2 ? multiplier = 0 : multiplier;\n    this.y += this.speed;\n    this.x -= (4/3 * this.speed)/5 * multiplier;\n    this.w += (1 + Math.sqrt(this.y)/240);\n    this.h += 1/3;\n  }\n\n  draw(){\n    this.ctx.fillStyle = \"blue\";\n    this.ctx.beginPath();\n    this.ctx.arc(this.x,this.y,this.w,0, Math.PI * 2, false);\n    this.ctx.fill();\n  }\n\n  isOffscreen(){\n    if (this.y > this.canv.height + this.w){\n      return true\n    }else{\n      return false;\n    }\n  }\n\n  findMultiplier(){\n    let random = Math.random();\n    let multiplier;\n    random > .5 ? multiplier = 955/960 : multiplier = 965/960;\n    random > .9 ? multiplier = 1: multiplier;\n    random < .1 ? multiplier = 950/960: multiplier;\n    return multiplier;\n  }\n\n}\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Obstacle);\n\n\n//# sourceURL=webpack:///./javascripts/obstacle.js?");

/***/ }),

/***/ "./javascripts/roadLines.js":
/*!**********************************!*\
  !*** ./javascripts/roadLines.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass RoadLine{\n\n  constructor(canv, ctx, y1 = 0){\n    this.canv = canv;\n    this.ctx = ctx;\n    this.x1 = this.canv.width * 1/2;\n    this.x2 = this.canv.width * 1/2;\n    this.y1 = y1;\n    this.y2 = this.y1 + 50;\n    this.dif = 7;\n  }\n\n  draw(){\n\n    this.ctx.beginPath();\n    this.ctx.moveTo(this.x1,this.y1);\n    this.ctx.lineTo(this.x2,this.y2);\n    this.ctx.stroke();\n\n  }\n\n  move(){\n    if(this.y1 < this.canv.height){\n      this.y1 += 18;\n      this.y2 = this.y1 - this.dif;\n      if(this.dif < 49){\n        this.dif += (this.dif)/7;\n      }\n    }else{\n      this.y1 = 0;\n      this.y2 = this.y1 + 50;\n      this.dif = 7;\n    }\n  }\n\n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RoadLine);\n\n\n//# sourceURL=webpack:///./javascripts/roadLines.js?");

/***/ }),

/***/ "./javascripts/scorebox.js":
/*!*********************************!*\
  !*** ./javascripts/scorebox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Scorebox{\n  constructor(canv,ctx){\n    this.score = 0;\n    this.canv = canv;\n    this.ctx = ctx;\n  }\n\n  updateScore(newScore){\n    this.score = newScore;\n  }\n\n  draw(){\n    this.ctx.font = \"30px Arial\";\n    this.ctx.fillStyle = \"red\";\n    this.ctx.strokeText(this.score,this.canv.width * 7/8,this.canv.height*1/8);\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scorebox);\n\n\n//# sourceURL=webpack:///./javascripts/scorebox.js?");

/***/ }),

/***/ "./javascripts/ship.js":
/*!*****************************!*\
  !*** ./javascripts/ship.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Ship{\n\n  constructor(canv,ctx){\n    this.ctx = ctx;\n    this.canv = canv;\n    this.x = this.canv.width / 2,\n    this.y = this.canv.height - 40;\n    this.s = 25;\n    this.moveLeft = this.moveLeft.bind(this);\n    this.moveRight = this.moveRight.bind(this);\n\n  }\n\n  draw(){\n    this.ctx.strokeStyle = \"orange\",\n    this.ctx.lineWidth = 50 / 20;\n\n    this.ctx.beginPath();\n    this.ctx.moveTo( //nose of this\n      this.x,\n      this.y - 4/3 * this.s\n    );\n\n    this.ctx.lineTo( //rear left\n      this.x - this.s,\n      this.y + this.s * (2/3)\n    );\n\n    this.ctx.lineTo( //rear right\n      this.x + this.s,\n      this.y + this.s * (2/3)\n    );\n    this.ctx.closePath();\n    this.ctx.stroke();\n\n  }\n\n  moveLeft(){\n    if(this.x > 0 + this.s + 10 && this.x > this.canv.width * 2/8 - 40){\n      this.x -= 60;\n    }\n  }\n  moveRight(){\n    if(this.x < this.canv.width - this.s -  10 && this.x < this.canv.width * 6/8 + 40){\n      this.x += 60;\n    }\n  }\n\n  move(e){\n    switch (e.keyCode) {\n      case 37:\n        this.moveLeft();\n        break;\n      case 39:\n        this.moveRight();\n        break;\n      default:\n\n    }\n  }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n\n//# sourceURL=webpack:///./javascripts/ship.js?");

/***/ }),

/***/ "./javascripts/side.js":
/*!*****************************!*\
  !*** ./javascripts/side.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Side{\n\n  constructor(canv,ctx){\n    this.canv = canv;\n    this.ctx = ctx;\n  }\n\n\n  drawLeft(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(1/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(3/8*this.canv.width,0);\n    this.ctx.stroke();\n  }\n\n  drawInnerLeft(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(3/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(4/8*this.canv.width -50,0);\n    this.ctx.stroke();\n  }\n\n  drawInnerRight(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(5/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(4/8*this.canv.width + 50,0);\n    this.ctx.stroke();\n  }\n\n  drawRight(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(7/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(5/8*this.canv.width ,0);\n    this.ctx.stroke();\n  }\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Side);\n\n\n//# sourceURL=webpack:///./javascripts/side.js?");

/***/ })

/******/ });