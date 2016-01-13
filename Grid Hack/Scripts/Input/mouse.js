/**
 * @module input
 */

"use strict"

/**
 * @class input
 */
var input = (function(input){

	/**
	 * @class mouse
	 * @submodule input
	 */
	var mouse = (function(mouse){
		mouse.x			= 0;
		mouse.y			= 0;
		mouse.cicked    = false;

		/**
		 * @event onMouseMove
		 * @param {event} evt An event which contains the relevant mouse data.
		 */
		mouse.onMouseMove = function(evt){
			var rect = this.getBoundingClientRect();

			mouse.x = evt.clientX - rect.left;
			mouse.y = evt.clientY - rect.top;
		};

		/**
		 * @event onClick
		 * @param {event} evt An event which contains the relevant mouse data.
		 */
		mouse.onClick = function(evt){
            mouse.clicked = true;
		}

		return mouse;
	})(mouse || {});

	input.mouse = mouse;

	return input;
})(input || {});