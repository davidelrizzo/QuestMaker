"use strict"

var QM = (function(QM){

	function Action(){

	}

	Action.prototype.handleInput = function(){

	};

	QM.Action = Action;

	function MoveAction(){
		QM.Action.call(this);
	}
	MoveAction.prototype = Object.create(QM.Action.prototype);

	MoveAction.prototype.handleInput = function(selectedCell){

	};

	QM.MoveAction = new MoveAction();


	return QM;
})(QM || {});