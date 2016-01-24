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

	/**
	 * Description
	 * @method Display
	 * @param {} canvasID
	 * @return 
	 */
	function Display(canvasID){
		this.canvas 	= document.getElementById(canvasID);
		this.context	= this.canvas.getContext("2d");
		this.scale      = 1;
		this.cellSize   = 64;
		this.offset     = {"x" : 0, "y" : 0};
	}

	/**
	 * Description
	 * @method clear
	 * @return 
	 */
	Display.prototype.clear = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	/**
	 * Description
	 * @method getMouseToCell
	 * @param {} x
	 * @param {} y
	 * @return pos
	 */
	Display.prototype.getMouseToCell = function(x, y){
		var pos = {};

		pos.x = Math.floor((x-this.offset.x)/(this.cellSize*this.scale));
		pos.y = Math.floor((y-this.offset.y)/(this.cellSize*this.scale));

		return pos;
	}

	Display.prototype.handleInput = function(input){
		// display scale input
		if(input.keyboard.isPressed(input.keyboard.PLUS)){
			input.keyboard.key[input.keyboard.PLUS].pressed = false;
			this.scale += 0.05;
		}
		if(input.keyboard.isPressed(input.keyboard.MINUS)){
			input.keyboard.key[input.keyboard.MINUS].pressed = false;
			this.scale -= 0.05;
			if(this.scale < 0.2){
				this.scale = 0.2;
			}
		}

		// display location input
		//if(input.keyboard.key[input.keyboard.UP]){
		if(input.keyboard.isPressed(input.keyboard.UP)){
			this.offset.y -= 5;
		}
		//if(input.keyboard.key[input.keyboard.DOWN]){
		if(input.keyboard.isPressed(input.keyboard.DOWN)){
			this.offset.y += 5;
		}
		//if(input.keyboard.key[input.keyboard.LEFT]){
		if(input.keyboard.isPressed(input.keyboard.LEFT)){
			this.offset.x -= 5;
		}
		//if(input.keyboard.key[input.keyboard.RIGHT]){
		if(input.keyboard.isPressed(input.keyboard.RIGHT)){
			this.offset.x += 5;
		}

	};

	graphics.Display = Display

	return graphics;
})(graphics || {});