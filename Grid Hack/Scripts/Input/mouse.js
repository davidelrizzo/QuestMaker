"use strict"

var input = (function(input){

	var mouse = (function(mouse){
		mouse.x			= 0;
		mouse.y			= 0;
		mouse.cicked    = false;

		mouse.onMouseMove = function(evt){
			var rect = this.getBoundingClientRect();

			mouse.x = evt.clientX - rect.left;
			mouse.y = evt.clientY - rect.top;
		};

		mouse.onClick = function(evt){
            mouse.clicked = true;
		}

		return mouse;
	})(mouse || {});

	input.mouse = mouse;

	return input;
})(input || {});