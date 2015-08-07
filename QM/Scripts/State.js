"use strict"

var QM = (function(QM){
	
	// Class: State
	// Desc: This is an abstract class which defines the expected behaviour of the
	//       current state of the application.
	function State()
	{

	}

	// Abstract function type.  Could maybe define this as undefined in the constructor.
	State.prototype.update = function(){};

	// Abstract function type.  Could maybe define this as undefined in the constructor.
	State.prototype.render = function(){};

	QM.State = State;
	return QM;
})(QM || {});