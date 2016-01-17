"use strict"

var QM = (function(QM){
	
	var key = {
		"up" : 38,	"right" : 39, "down" : 40, "left" : 37
	};

	function Keyboard(){
		this.keys = [];

		for(var n = 0; n < 256; n++){
			this.keys[n] = false;
		}
	}

	Keyboard.prototype.onKeyDown = function(event){
		console.log(event.keyCode);

		var code = event.keyCode;
		if(code < 0 || code > 255){
			return;	
		}

		QM.Input.keyboard.keys[code] = true;
	};

	Keyboard.prototype.onKeyUp = function(event){
		console.log(event.keyCode);

		var code = event.keyCode;
		if(code < 0 || code > 255){
			return;	
		}

		QM.Input.keyboard.keys[code] = false;
	};

	QM.Input = QM.Input || {};
	QM.Input.key = key;
	QM.Input.keyboard = new Keyboard();
	return QM;
})(QM || {});