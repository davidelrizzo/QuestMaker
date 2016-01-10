/**
 * FILE sprite.js
 * DESC
 * REQUIRES
 *    pixel.js
 * TO DO
 *        o add rotation capability
 *        o add cursor hit detection
 *        o this requires a imageData storage component
 *          build this when the sprite is initialized?
 */

"use strict"

var graphics = (function(graphics){
	console.log("sprite.js loaded");

	/**
	 * Globals
	 */
	var loaded = 0;

	var RED      = 0;
	var GREEN    = 1;
	var BLUE     = 2;
	var ALPHA    = 3;

	graphics.getLoaded = function(){
		return loaded;
	};
	
	function Sprite(path){
		loaded++;
		this.img 			= new Image();
		this.img.onload 	= this.onload;
		this.img.src 		= path;

		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
	}

	Sprite.prototype.onload = function(){
		loaded--;
	};

	Sprite.prototype.buildImageData = function(){
		this.context.drawImage(
			this.img,
			0, 0, this.img.width, this.img.height,
			0, 0, this.img.width, this.img.height);

		this.imageData 		= this.context.getImageData(0, 0, this.img.width, this.img.height);
		this.data 			= this.imageData.data;
	};

	Sprite.prototype.getPixelColor = function(x, y){
        if(this.data === undefined){
            return undefined;	
        }
        
        // Ensure that the input is a round number.
        var it = Math.floor(y*this.img.width * 4 + (x * 4));

		var pixel = new graphics.Pixel(
			this.data[it + RED],
			this.data[it + GREEN],
			this.data[it + BLUE],
			this.data[it + ALPHA]
			);
		return pixel;        
	};

	Sprite.prototype.isMouseOver = function(x, y){

        return false;
	};

	Sprite.prototype.draw = function(context, x, y, w, h){
		context.save();

		try{
			context.drawImage(this.img, 0, 0, this.img.width, this.img.height, x, y, w, h);
		} catch (e) {
			console.log(e);
		}

		context.restore();
	};

	graphics.Sprite = Sprite;

	return graphics
})(graphics || {});