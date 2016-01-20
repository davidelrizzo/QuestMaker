"use strict"

var graphics = (function(graphics){
	console.log("spriteSheet.js loaded");

	/**
	 * Description
	 * @method SpriteSheet
	 * @param {} path
	 * @param {} index
	 * @param {} interval
	 * @param {} state
	 * @return 
	 */
	function SpriteSheet(path, index, interval, state){
		graphics.Sprite.call(this, path);

		this.index 		= index;
		this.interval 	= interval;
		this.state 		= state;
	}
	SpriteSheet.prototype = Object.create(graphics.Sprite.prototype);

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} x
	 * @param {} y
	 * @param {} w
	 * @param {} h
	 * @param {} state
	 * @return 
	 */
	SpriteSheet.prototype.draw = function(context, x, y, w, h, state){
		context.save();

		state = state || this.state;

		context.drawImage(
			this.img, 
			this.index[state] * this.interval, 0, this.interval, this.img.height, 
			x, y, w, h);

		context.restore();
	};

	graphics.SpriteSheet = SpriteSheet;

	return graphics;
})(graphics || {});