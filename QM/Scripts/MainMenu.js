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

	MainMenu_Singleton.prototype.update()
	{
		console.log("MainMenu_Singleton.update");
	};

	QM.MainMenu_Singleton = MainMenu_Singleton;

	return QM;
})(QM || {});