//=====================================================================================
// File: QMState.js
// Desc: AppState is a base class to be used to create instances of the state of
//		 application.  The user should be able to navigate between the various
//       application states.  An application state should not be confused with a game
//       state.
//=====================================================================================

"use strict"

var QM = (function(QM){

  class QMState{
    update(){} // children should overwrite this method.

    run(){} // children should overwrite this method.
  }

	QM.QMState = QMState;
  
	return QM;
})(QM || {});