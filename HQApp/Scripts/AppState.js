//=====================================================================================
// File: AppState.js
// Desc: AppState is a base class to be used to create instances of the state of
//		 application.  The user should be able to navigate between the various
//       application states.  An application state should not be confused with a game
//       state.
//=====================================================================================

"use strict"

var HQApp = (function(HQApp){

  	//----------------------------------------------------------------------------------
  	// Class: AppState
  	// Desc: This is the constructor class for an AppState object.  It is intended that
  	//       these objects will facilitate customized user interface with respect to the
  	//       current state of the application.  For example, one AppState object might
  	//       be a main menu page, another might be a store page.
  	//----------------------------------------------------------------------------------
  	function AppState(id)
  	{
		this._id = id;
	};

  	//----------------------------------------------------------------------------------
  	// Method:
  	// Desc:
  	//----------------------------------------------------------------------------------
	AppState.prototype.update = function()
	{
		// To Fill In
	};

  	//----------------------------------------------------------------------------------
  	// Method:
  	// Desc:
  	//----------------------------------------------------------------------------------
	AppState.prototype.render = function()
	{
		// To Fill In
	};	

	HQApp.main_menu = new AppState("main menu");
	return HQApp;
})(HQApp || {});