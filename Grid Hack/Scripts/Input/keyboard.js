var input = (function(input){

	var keyboard = (function (keyboard){

		keyboard.UP     = 38;
		keyboard.DOWN   = 40;
		keyboard.LEFT   = 37;
		keyboard.RIGHT  = 39;
		keyboard.PLUS   = 187;
		keyboard.MINUS  = 189;

		keyboard.key = {};

		keyboard.onKeyDown = function(evt){
			keyboard.key[evt.keyCode] = true;
		};

		keyboard.onKeyUp = function(evt){
			keyboard.key[evt.keyCode] = false;
		};

		return keyboard;
	})(keyboard || {});

	input.keyboard = keyboard;
	return input;
})(input || {});

