"use strict"

var graphics = (function(graphics){
	console.log("pixel.js laoded");


	function Pixel (r, g, b, a){
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	Pixel.prototype.isTransparent = function(){
		if(this.r === 0 && this.g === 0 && this.b === 0){
			return true;
		}

		return false;
	}

	graphics.Pixel = Pixel;

	return graphics;
})(graphics || {});