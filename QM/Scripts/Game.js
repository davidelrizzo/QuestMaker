//=====================================================================================
// File: Game.js
// Desc: This file contains the class associated with the game state of the
//       QM application.
//=====================================================================================

var QM = (function(QM){

	function Game_Singleton()
	{
		QM.QMState.call(this);
	}
	Game_Singleton.prototype = Object.create(QM.QMState.prototype);

	QM.Game = new Game_Singleton();
	return QM;
})(QM || {});
