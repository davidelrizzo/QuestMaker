/**
 * @module gh
 */

"use strict"

/** 
 * @class gh
 */
var gh = (function(gh){
	console.log("dice.js loaded");
	
	/**
	 * @class Dice
	 * @constructor
	 * param {Integer} sides The number of sides the dice has, defaults to 6.
	 * param {String}  spriteSheet The index name of the sprite sheet  of the dice.
	 */
	function Dice(sides, spriteSheet){
		this.sides = sides || 6;
		this.spriteSheet = spriteSheet;
	}

	/**
	 * @method roll
	 * @return {Integer}
	 */
	Dice.prototype.roll = function(){
		return Math.floor(Math.random() * this.sides) + 1;
	};

	/**
	 * @method draw
	 * @param {Integer} num The number value of the side of the dice to draw.
	 * @param {Object}  context The canvas context upon which to draw.
	 * @param {Integer} x The x coordinate where to draw from.
	 * @param {Integer} y The y coordinate where to draw from.
	 * @param {Integer} w The width fo the image to be drawn.
	 * @param {Integer} h The height of the image to be drawn.
	 * @param {Object}  sprites An object containing Sprites indexed by the name of the image.
	 */
	Dice.prototype.draw = function(num, context, x, y, w, h, sprites){
		context.drawImage(
			sprites[this.spriteSheet].img,
			(num - 1) * 100, 0, 100, 100,
			x, y, w, h);
	};

	gh.Dice = Dice;

	return gh;
})(gh || {});