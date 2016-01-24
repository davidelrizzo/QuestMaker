"use strict"

/**
 * @module gh
 */

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("weapon.js loaded");

	/**
	 * @class Weapon
	 */
	function Weapon(name, size, attack, hands, range, diagonal, cost, sprite){
		this.name 			= name;
		this.size 			= size;
		this.attack 		= attack;
		this.hands			= hands;
		this.range			= range;
		this.diagonal 		= diagonal;
		this.cost 			= cost;
		this.sprite 		= sprite;
	}

	gh.Weapon = Weapon;

	return gh;
})(gh || {});