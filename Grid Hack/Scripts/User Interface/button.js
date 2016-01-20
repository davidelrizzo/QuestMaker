"use strict"

var gh = (function(gh){
	console.log("button.js loaded");

	/**
	 * Description
	 * @class Button
	 * @method Button
	 * @param {String} id The name of the button.
	 * @param {SpriteSheet} spriteSheet A sprite sheet with 'inert' and 'active' states depicted.
	 * @return 
	 */
	function Button(id, spriteSheet){
		this.id 			= id;
		this.spriteSheet 	= spriteSheet;
		this.top;
		this.left;
		this.bottom;
		this.right;
		this.state 			= "inert";
		this.clicked 		= false;
	}

	/**
	 * Draws the button to a given canvas context at the provided x,y coordinate with the width and height of the button provided.
	 * @method draw
	 * @param {} context
	 * @param {} x The left coordinate of the button.
	 * @param {} y The top coordinate of the button.
	 * @param {} w The width of the button.
	 * @param {} h The height of the button.
	 * @return 
	 */
	Button.prototype.draw = function(context, x, y, w, h){
		this.spriteSheet.draw(context, x, y, w, h, this.state);

		this.left 	= x;
		this.top 	= y;
		this.right 	= x + w;
		this.bottom = y + h;
	};

	Button.prototype.isMouseOver = function(mouseX, mouseY){
		if(mouseX >= this.left && mouseX <= this.right && mouseY >= this.top && mouseY <= this.bottom){
			return true;
		}

		return false;
	};

	Button.prototype.onMouseOver = function(args){
		if(this.isMouseOver(args.mouseX, args.mouseY)){
			this.state = "active";
		} else {
			this.state = "inert";
		}

	};

	gh.Button = Button;

	return gh;
})(gh || {});