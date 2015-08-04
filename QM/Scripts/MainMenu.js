//=====================================================================================
// File: MainMenu.js
// Desc:
//=====================================================================================

"use strict"

var QM = (function(QM){


	function MainMenu_Singleton()
	{
		QM.QMState.call(this);
	};
	MainMenu_Singleton.prototype = Object.create(QM.QMState.prototype);

	QM.MainMenu = new MainMenu_Singleton();

	return QM;
})(QM || {});