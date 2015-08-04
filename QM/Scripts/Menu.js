//=====================================================================================
// File: Menu.js
// Desc: The menu maintains the current state of the application.  In effect the menu
//       system is a wrapper to maintain the current state of the broader application, 
//       which is not to be confused with the current state of the 'game'.
//=====================================================================================

"use strict"

var QM = (function(QM){

	class Menu_Singleton
	{
		constructor()
		{
			this._mainMenu = undefined;
			this._activeState = undefined;
		}

		initialize()
		{
			QM.Menu._activeState = new QM.MainMenu_Singleton();			
		}

		//----------------------------------------------------------------------------
		// Method: runQuestMaker
		// Desc: This method is responsible for 'running' the entire application.
		//       It simply asks the currently active application state to update and
		//       then render as required.
		//----------------------------------------------------------------------------
		runQuestMaker()
		{
			QM.Menu._activeState.update();
			QM.Menu._activeState.render();

			requestAnimationFrame(QM.Menu.runQuestMaker);
		}
	}

	QM.Menu = new Menu_Singleton();

	return QM;
})(QM || {});