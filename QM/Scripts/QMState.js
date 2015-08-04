//=====================================================================================
// File: QMState.js
// Desc: AppState is a base class to be used to create instances of the state of
//		 application.  The user should be able to navigate between the various
//       application states.  An application state should not be confused with a game
//       state.
//=====================================================================================

"use strict"

var QM = (function(QM){

  //----------------------------------------------------------------------------------
  // Class: QMState
  // Desc: This is the constructor class for an QMState object.  It is intended that
  //       these objects will facilitate customized user interface with respect to the
  //       current state of the application.  For example, one QMState object might
  //       be a main menu page, another might be a store page.
  //----------------------------------------------------------------------------------
  function QMState()
  {
    // To Fill In
  };

  //----------------------------------------------------------------------------------
  // Method:
  // Desc:
  //----------------------------------------------------------------------------------
	QMState.prototype.update = function()
	{
		// To Fill In
	};

  //----------------------------------------------------------------------------------
  // Method:
  // Desc:
  //----------------------------------------------------------------------------------
	QMState.prototype.render = function()
	{
		// To Fill In
	};	

	QM.QMState = QMState;
  
	return QM;
})(QM || {});