/**
 * @module input
 * @main input
 */

 "use strict"

/**
 * @class input
 */
var input = (function(input){

    /**
     * @class keybaord
     * @submodule input
     */
	var keyboard = (function (keyboard){

		keyboard.LEFT   = 37;
		keyboard.UP     = 38;
		keyboard.RIGHT  = 39;
		keyboard.DOWN   = 40;

		keyboard.A 		= 65;
		keyboard.D      = 68;
		keyboard.S 		= 83;
		keyboard.W 		= 87;
		
		keyboard.PLUS   = 187;
		keyboard.MINUS  = 189;

		keyboard.key = {};

		/**
		 * @event onKeyDown
		 * @param {event} evt An event which contains the relevant KeyCode data.
		 */
		keyboard.onKeyDown = function(evt){
			console.log(evt.keyCode);
//			keyboard.key[evt.keyCode] = true;
			keyboard.key[evt.keyCode] = keyboard.key[evt.keyCode] || {};

//			console.log(keyboard);

			if(keyboard.key[evt.keyCode].pressed === true){
				keyboard.key[evt.keyCode].repeat = true;
			} else {
				keyboard.key[evt.keyCode].repeat = false;
			}

			keyboard.key[evt.keyCode].pressed = true;
		};

		/**
		 * @event onKeyUp
		 * @param {event} evt An event which contains the relevant KeyCode data.
		 */
		keyboard.onKeyUp = function(evt){
			keyboard.key[evt.keyCode].pressed = false;
			keyboard.key[evt.keyCode].repeat = false;
		};

		/**
		 * This method determines whether or not a key has been pressed or not for the first time.
		 *  
		 * @method isPressed
		 * @param {Integer} key The ascii value of the key for which to querry its state.
		 */
		keyboard.isPressed = function(key){
			//console.log(key);
			//console.log(this.key[key]);

/*
			if(!keyboard.key){
				return false;
			}
*/
			if(keyboard.key[key]){
				if(keyboard.key[key].pressed === true && keyboard.key[key].repeat === false){
					return true;
				}
			}

			return false;
		}

		return keyboard;
	})(keyboard || {});

	input.keyboard = keyboard;
	return input;
})(input || {});

