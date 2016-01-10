/**
 * TO DO
 *    Separate the display to include a 'board' and a 'hud'.
 *    The 'board' is intended to display the active game.
 *    The hud displays the user interaction tools.  EG, weapon slots,
 *    spells, potions, etc...
 *
 *    Consider having the display 'listen' for changes to the keyboard state.
 */

"use strict"

var graphics = (function(graphics){
	console.log("display.js loaded");

	function Display(canvasID){
		this.canvas 	= document.getElementById(canvasID);
		this.context	= this.canvas.getContext("2d");
		this.scale      = 1;
		this.cellSize   = 64;
		this.offset     = {"x" : 0, "y" : 0};
	}

	Display.prototype.clear = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	Display.prototype.getMouseToCell = function(x, y){
		var pos = {};

		pos.x = Math.floor((x-this.offset.x)/(this.cellSize*this.scale));
		pos.y = Math.floor((y-this.offset.y)/(this.cellSize*this.scale));

		return pos;
	}

	graphics.Display = Display

	return graphics;
})(graphics || {});