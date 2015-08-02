// stop jsLint complaining about the global 'window' object
/*jslint browser: true*/

// Sets JavaScript to scrict mode
"use strict";

// Creates the QuestMaker global namespace if it doesn't already exist
var QM = window.QM || {};




/**********************************************************
* CLASS: Campaign
* ====
* The Campaign class contains the methods used to run a campaign of game levels. It contains all data that is carried between levels.
*
* **argument:** {String:JSON} DATA - initial static loaded data for this campaign
**********************************************************/
QM.Campaign = function (DATA) {

  // The DATA parameter will contain all blueprint data for Campaign set-up including Campaign settings, Teams, Level ids, Creatures, Spells, Triggers, Equipment, Conditions and Furniture data



  // **private property:** _minPlayers, **type:** {Number:Integer}, **default:** 2
  // Minimum number of players possible in this Campaign
  var _minPlayers = 2;

  // **private property:** _maxPlayers, **type:** {Number:Integer}, **default:** 2
  // Maximum number of players possible in this Campaign
  var _maxPlayers = 2;

  // **public property:** players, **type:** {Array:Player}, **default:** Empty array []
  // List of current players in this Campaign ('Player' object)
  this.players = [];



  // **private property:** _minTeams, **type:** {Number:Integer}, **default:** 2
  // Minimum number of teams possible in this Campaign
  var _minTeams = 2;

  // **private property:** _maxTeams, **type:** {Number:Integer}, **default:** 2
  // Maximum number of teams possible in this Campaign
  var _maxTeams = 2;

  // **public property:** teams, **type:** {Array:Team}, **default:** Empty array []
  // List of current teams in this Campaign ('Team' Class)
  // _NOTE:_ team starting characters & map view settings (eg evil wizard player flag) will be defined in the Team object itself
  this.teams = [];



  // **public property:** currentLevel, **type:** {Number:Integer}, **default:** 0
  // Id of the {levels} array which contains the current Level
  this.currentLevel = 0;

  // **public property:** levels, **type:** {Array:(String|Level)}, **default:** Empty array
  // An array containing either the level id {String} or the Level object itself after it has been loaded
  this.level = [];



  /**********************************************************
  * CONSTRUCTOR
  * ----
  * Initialises Campaign properties with DATA passed in on Campaign creation
  **********************************************************/
  var _init = function () {

    // TODO: convert DATA (JSON string) to JS objects?
    // TODO: create initial player settings from DATA
    // TODO: create initial team settings from DATA
    // TODO: create initial level settings from DATA

  };
  _init();



};




/**********************************************************
* PUBLIC METHOD: addPlayer
* ----
* Adds a new player to the campaign and initialises it with passed in values
* **argument:** player, **type:** {Object:Player}, **returns:** id of QM.Campaign.players it was added to
**********************************************************/
QM.Campaign.prototype.addPlayer = function (player) {

  // TODO: push given Player onto QM.Campaign.players and return id

};


/**********************************************************
* PUBLIC METHOD: removePlayer
* ----
* Removes a player from the game
* **argument:** id, **type:** {Number:Integer}, **returns:** nothing
**********************************************************/
QM.Campaign.prototype.addPlayer = function (id) {

  // TODO: replace Player at QM.Campaign.players {id} with null (do not reduce the array count as that will affect the id of all other players)

};



// TODO: addTeam
// TODO: removeTeam

// TODO: loadLevel
