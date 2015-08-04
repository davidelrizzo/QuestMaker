//=====================================================================================
// File: MainMenu.js
// Desc:
//=====================================================================================

"use strict"

var QM = (function(QM){

	class MainMenu_Singleton extends QM.QMState
	{
		constructor()
		{
			this._backgroundImg = undefined;
		}

		update(){
		}

		render(){
		}
	}

	QM.MainMenu_Singleton = MainMenu_Singleton;

	return QM;
})(QM || {});