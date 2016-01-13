/**
 * @module gh
 */

"use strict"

/** 
 * @class gh
 */
var gh = (function(gh){

	/**
	 * @class Dice
	 * @constructor
	 * param {Integer} sides The number of sides the dice has, defaults to 6.
	 * param {Object} spriteSheet
	 */
	function Dice(sides, spriteSheet){
		this.sides = sides || 6;
		this.spriteSheet = spriteSheet;
	}

	/**
	 * @method roll
	 * @return {Integer}
	 */
	Dice.roll = function(){
		return Math.floor(Math.random() * this.sides) + 1;
	}

	gh.Dice = Dice;

	return gh;
})(gh || {});