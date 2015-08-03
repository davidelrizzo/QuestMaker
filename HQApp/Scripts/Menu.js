//=====================================================================================
// File: Menu.js
// Desc: The menu maintains the current state of the application.  In effect the menu
//       system is a wrapper to maintain the current state of the broader application, 
//       which is not to be confused with the current state of the 'game'.
//=====================================================================================

"use strict"

var HQApp = (function(HQApp){

	function Menu_Singleton(mm)
	{
		this._MainMenu = mm;
	}

	HQApp.mainMenu = new Menu_Singleton(HQApp.main_menu);
	return HQApp;
})(HQApp || {});