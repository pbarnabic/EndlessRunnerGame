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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./javascripts/ship.js\");\n/* harmony import */ var _obstacle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./obstacle.js */ \"./javascripts/obstacle.js\");\n/* harmony import */ var _side_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./side.js */ \"./javascripts/side.js\");\n\n\n\nclass Game{\n\n  constructor(){\n\n    this.canv = document.getElementById(\"gameCanvas\");\n    this.ctx = this.canv.getContext(\"2d\");\n    this.ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canv,this.ctx);\n    this.obstacles = [];\n    this.side = new _side_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.canv,this.ctx);\n    this.keyDown = this.keyDown.bind(this);\n    this.update = this.update.bind(this);\n    this.createNewObstacles = this.createNewObstacles.bind(this);\n    this.counter = 0;\n    this.hasCollided = this.hasCollided.bind(this);\n    this.isOver = false;\n\n    document.addEventListener(\"keydown\", this.keyDown);\n\n\n    this.play();\n\n  }\n\n  play(){\n    setInterval(this.update, 1000 / 60);\n  }\n\n  keyDown(e){\n    this.ship.move(e);\n  }\n\n\n  update(){\n\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillRect(0,0,this.canv.width,this.canv.height);\n    this.side.drawLeft();\n    this.side.drawRight();\n    this.ship.draw();\n    if(!this.isOver){\n      for(var i = this.obstacles.length - 1; i >= 0; i --){\n        if(this.hasCollided(this.obstacles[i])){\n          this.isOver = true;\n          break;\n        }\n        if(this.obstacles[i].isOffscreen()){\n          this.obstacles.splice(1,i);\n        }else{\n          this.obstacles[i].move();\n          this.obstacles[i].draw();\n        }\n      }\n      if(this.obstacles.length < 5 && this.counter > 60 && this.counter % 60 == 0){\n        this.createNewObstacles();\n      }\n      this.counter += 1;\n      console.log(this.counter);\n    }\n  }\n\n  createNewObstacles(){\n    var speed = 3;\n    if(this.counter > 500){\n      speed = 9;\n    }else if(this.counter > 1500){\n      speed = 12;\n    }else if(this.counter > 3000){\n      speed = 15;\n    }else{\n      speed = 9;\n    }\n    let obstacle = new _obstacle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.canv,this.ctx,speed);\n    this.obstacles.push(obstacle);\n  }\n\n  hasCollided(obstacle){\n    let dist = this.calcDistance(obstacle,this.ship);\n    if (dist < this.ship.s + obstacle.w && obstacle.y <= this.ship.y){\n      return true;\n    }\n    return false;\n  }\n\n  calcDistance(ob1,ob2){\n    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y,2));\n  }\n\n\n}\n\nnew Game();\n\n\n//# sourceURL=webpack:///./javascripts/game.js?");

/***/ }),

/***/ "./javascripts/obstacle.js":
/*!*********************************!*\
  !*** ./javascripts/obstacle.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Obstacle{\n\n  constructor(canv,ctx,speed){\n    this.canv = canv;\n    this.ctx = ctx;\n    //Math.floor(Math.random()*(max-min+1)+min) generates a random number between x and y\n    this.w = Math.floor(Math.random()*(10)+20);\n    // this.w = Math.floor(Math.random()*(80)+20);\n    this.h = 40;\n    this.leftWall = 360;\n    this.leftWallOffset = Math.floor(Math.random()*(80))\n    this.x = this.leftWall + this.leftWallOffset;\n    this.y = 0;\n    this.multiplier = this.findMultiplier();\n    this.speed = speed;\n\n  }\n\n  move(){\n    this.y += this.speed * this.canv.height/this.canv.width;\n    this.leftWall *= this.multiplier;\n    this.x = this.leftWall + this.leftWallOffset;\n    this.w += 1;\n    this.h += 1/4;\n  }\n\n  draw(){\n    this.ctx.fillStyle = \"blue\";\n    this.ctx.beginPath();\n    this.ctx.arc(this.x,this.y,this.w,0, Math.PI * 2, false);\n    this.ctx.fill();\n  }\n\n  isOffscreen(){\n    if (this.y > this.canv.height){\n      return true\n    }else{\n      return false;\n    }\n  }\n\n  findMultiplier(){\n    let random = Math.random();\n    let multiplier;\n    random > .5 ? multiplier = 955/960 : multiplier = 965/960;\n    random > .9 ? multiplier = 1: multiplier;\n    random < .1 ? multiplier = 950/960: multiplier;\n    return multiplier;\n  }\n\n}\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Obstacle);\n\n\n//# sourceURL=webpack:///./javascripts/obstacle.js?");

/***/ }),

/***/ "./javascripts/ship.js":
/*!*****************************!*\
  !*** ./javascripts/ship.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Ship{\n\n  constructor(canv,ctx){\n    this.ctx = ctx;\n    this.canv = canv;\n    this.x = this.canv.width / 2,\n    this.y = this.canv.height - 40;\n    this.s = 25;\n    this.moveLeft = this.moveLeft.bind(this);\n    this.moveRight = this.moveRight.bind(this);\n\n  }\n\n  draw(){\n    this.ctx.strokeStyle = \"orange\",\n    this.ctx.lineWidth = 50 / 20;\n\n    this.ctx.beginPath();\n    this.ctx.moveTo( //nose of this\n      this.x,\n      this.y - 4/3 * this.s\n    );\n\n    this.ctx.lineTo( //rear left\n      this.x - this.s,\n      this.y + this.s * (2/3)\n    );\n\n    this.ctx.lineTo( //rear right\n      this.x + this.s,\n      this.y + this.s * (2/3)\n    );\n    this.ctx.closePath();\n    this.ctx.stroke();\n\n  }\n\n  moveLeft(){\n    if(this.x > 0 + this.s + 10){\n      this.x = this.x - 40;\n    }\n  }\n  moveRight(){\n    if(this.x < this.canv.width - this.s -  10){\n      this.x = this.x + 40;\n    }\n  }\n\n  move(e){\n    switch (e.keyCode) {\n      case 37:\n        this.moveLeft();\n        break;\n      case 39:\n        this.moveRight();\n        break;\n      default:\n\n    }\n  }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n\n//# sourceURL=webpack:///./javascripts/ship.js?");

/***/ }),

/***/ "./javascripts/side.js":
/*!*****************************!*\
  !*** ./javascripts/side.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Side{\n\n  constructor(canv,ctx){\n    this.canv = canv;\n    this.ctx = ctx;\n  }\n\n\n  drawLeft(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(1/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(3/8*this.canv.width,0);\n    this.ctx.stroke();\n  }\n\n  drawRight(){\n    this.ctx.beginPath();\n    this.ctx.moveTo(7/8*this.canv.width,this.canv.height);\n    this.ctx.lineTo(5/8*this.canv.width,0);\n    this.ctx.stroke();\n  }\n\n\n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Side);\n\n\n//# sourceURL=webpack:///./javascripts/side.js?");

/***/ })

/******/ });