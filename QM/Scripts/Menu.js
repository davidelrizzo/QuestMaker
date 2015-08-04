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
	};

	Menu_Singleton.prototype.initialize = function()
	{
		this._mainMenu = new QM.MainMenu_Singleton();
		this._activeState = this._mainMenu;
	};

  	//--------------------------------------------------------------------------------
  	// Method: runQuestMaker
  	// Desc: This function runs the entirety of the application.  It asks that the
  	//       currently active game state update and then render as required.  The
  	//       details of what transpires with each update and render is controlled by
  	//       the active game state.
  	//--------------------------------------------------------------------------------
	Menu_Singleton.prototype.runQuestMaker = function()
	{
		QM.Menu._activeState.update();
		QM.Menu._activeState.render();

		requestAnimationFrame(Menu_Singleton.prototype.runQuestMaker);
	};

	QM.Menu = new Menu_Singleton();

	return QM;
})(QM || {});