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
		 * Description
		 * @event onMouseMove
		 * @method onMouseMove
		 * @param {event} evt An event which contains the relevant mouse data.
		 * @return 
		 */
		mouse.onMouseMove = function(evt){
			var rect = this.getBoundingClientRect();

			mouse.x = evt.clientX - rect.left;
			mouse.y = evt.clientY - rect.top;
		};

		/**
		 * Description
		 * @event onClick
		 * @method onClick
		 * @param {event} evt An event which contains the relevant mouse data.
		 * @return 
		 */
		mouse.onClick = function(evt){
            mouse.clicked = true;
		}

		return mouse;
	})(mouse || {});

	input.mouse = mouse;

	return input;
})(input || {});