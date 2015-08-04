//=====================================================================================
// File: Menu.js
// Desc: The menu maintains the current state of the application.  In effect the menu
//       system is a wrapper to maintain the current state of the broader application, 
//       which is not to be confused with the current state of the 'game'.
//=====================================================================================

"use strict"

var QM = (function(QM){

	function Menu_Singleton()
	{
		this._MainMenu = QM.MainMenu;
		this._Game = QM.Game;
	};

	QM.mainMenu = new Menu_Singleton();

	return QM;
})(QM || {});