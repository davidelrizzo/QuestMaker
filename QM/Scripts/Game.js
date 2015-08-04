//=====================================================================================
// File: Game.js
// Desc: This file contains the class associated with the game state of the
//       QM application.
//=====================================================================================

"use strict"

var QM = (function(QM){

	function Game_Singleton()
	{
		QM.QMState.call(this);
	}
	Game_Singleton.prototype = Object.create(QM.QMState.prototype);

	QM.Game_Singleton = Game_Singleton;
	return QM;
})(QM || {});
