//=====================================================================================
// File: Game.js
// Desc: This file contains the class associated with the game state of the
//       QM application.
//=====================================================================================

"use strict"

var QM = (function(QM){

	// Class: GameState
	// Parent: State
	function GameState()
	{
		QM.State.call(this);
	}
	GameState.prototype = Object.create(QM.State.prototype);

	GameState.prototype.update = function()
	{
		// add code.
	}

	GameState.prototype.render = function()
	{
		// add code.
	}

	QM.GameState = GameState;
	return QM;
})(QM || {});
