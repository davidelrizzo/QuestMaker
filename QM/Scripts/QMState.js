//=====================================================================================
// File: QMState.js
// Desc: AppState is a base class to be used to create instances of the state of
//		 application.  The user should be able to navigate between the various
//       application states.  An application state should not be confused with a game
//       state.  An application state is required to have an update and render method.
//=====================================================================================

"use strict"

var QM = (function(QM){

	// Class: QMState
	function QMState()
	{
	};

	QMState.prototype.update = function()
	{
		return "";
	};

	QMState.prototype.render = function()
	{

	};

	QM.QMState =  QMState;
	return QM;
})(QM || {});