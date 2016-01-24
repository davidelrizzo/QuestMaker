/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("hud.js loaded");

	/**
	 * The hud encapsulates all aspects of the user interface with which a player can interact.
	 * The hud is displayed on top of the game board.
	 *
	 * @class hud
	 */
	var hud = (function(hud){

		/**
		 * Private globals
		 */

		var sprites = {
			"endTurn" : new graphics.SpriteSheet("./Data/Graphics/Interface/EndTurn.gif", {"inert" 	: 0, "active" 	: 1}, 128,"inert")
		};

		/**
		 * Public globals
		 */

		/** 
	     * @class buttonEndTurn
	     */
		hud.buttonEndTurn = new gh.Button("End Turn", new graphics.SpriteSheet("./Data/Graphics/Interface/EndTurn.gif", {"inert" 	: 0, "active" 	: 1}, 128,"inert"));

		/**
		 * @method
		 */		
		hud.buttonEndTurn.onClick = function(args){
			//console.log(args);
			if(this.isMouseOver(args.mouseX, args.mouseY)){
				console.log("buttonEndTurn clicked");
				this.clicked = true;
			}	
		};

		/**
		 * Public methods
		 */

		/**
		 * @method setup
		 * @return
		 */
		hud.setup = function(){
			sprites.endTurn.buildImageData();
		}

		/**
		 * @method draw
		 * @return 
		 */
		hud.draw = function(){
			var displayWidth = document.getElementById("ghCanvas").width;
			var displayHeight = document.getElementById("ghCanvas").height;

			var x = displayWidth - (128 * gh.display.scale);
			var y = displayHeight - (64 * gh.display.scale);

			this.buttonEndTurn.draw(
				gh.display.context, 
				x, 
				y, 
				128 * gh.display.scale, 
				64 * gh.display.scale);
		};

		return hud;
	})(hud || {});

	gh.hud = hud;

	return gh;
})(gh || {});