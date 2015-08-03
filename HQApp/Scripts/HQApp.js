//=====================================================================================
// File: HQApp.js
// Desc: This file contains the initial definition of the Hero Quest application
//       namespace.  All aspects of the Hero Quest application should exists within
//       this namespace, whether they relate to user interface of the game engine
//       itself.
//=====================================================================================
"use strict"

var HQApp = (function(HQApp){
  
  //----------------------------------------------------------------------------------
  // Method: start
  // Desc: This method initializes and runs the Hero Quest application.
  //----------------------------------------------------------------------------------
  HQApp.start = function()
  {
  	console.log(HQApp);
  };

  return HQApp;
})(HQApp || {});