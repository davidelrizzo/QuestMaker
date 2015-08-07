//=====================================================================================
// File: QMState.js
// Desc: AppState is a base class to be used to create instances of the state of
//		 application.  The user should be able to navigate between the various
//       application states.  An application state should not be confused with a game
//       state.
//=====================================================================================

"use strict"

var QM = (function(QM){

	// Class: QMState
	function QMState()
	{
		this._mainMenuState = undefined;
		this._gameState = undefined;
		this._currentState = undefined;
	}

	QMState.prototype.initialize = function()
	{
		this._mainMenuState = new QM.MainMenuState(QM.Canvas2D);
		this._gameState = new QM.GameState;
		this._currentState = this._mainMenuState;
	}

	QM.QMState = new QMState();
	return QM;
})(QM || {});