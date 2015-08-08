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
		QM.QMState.call(this);
	}
	GameState.prototype = Object.create(QM.QMState.prototype);

	GameState.prototype.update = function()
	{
		return "gameState";
	}

	GameState.prototype.render = function()
	{
		// add code.
	}

	QM.GameState = GameState;
	return QM;
})(QM || {});
