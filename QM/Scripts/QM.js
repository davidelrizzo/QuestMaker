//=====================================================================================
// File: QM.js
// Desc: This file contains the initial definition of the Hero Quest application
//       namespace.  All aspects of the Hero Quest application should exists within
//       this namespace, whether they relate to user interface of the game engine
//       itself.
//=====================================================================================
"use strict"

var QM = (function(QM){
  
  //----------------------------------------------------------------------------------
  // Method: start
  // Desc: This method initializes and runs the Hero Quest application.
  //----------------------------------------------------------------------------------
  function start()
  {
  	console.log("start");
	QM.Canvas2D.initialize("cDisplay");
	QM.Menu.initialize();
	QM.Menu.runQuestMaker();
  };

  QM.start = start;

  return QM;
})(QM || {});
