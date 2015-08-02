// stop jsLint complaining about the global 'window' object
/*jslint browser: true*/

// Sets JavaScript to scrict mode
"use strict";

// Creates the QuestMaker global namespace if it doesn't already exist
var QM = window.QM || {};




/**********************************************************
* CLASS Campaign
* ====
* The Campaign class contains the methods used to run a campaign of game levels. It contains all data that is carried between levels.
*
* **argument:** {String:JSON} DATA - initial loaded data for this campaign
**********************************************************/
QM.Campaign = function (DATA) {

  // The DATA parameter will contain all blueprint data for Campaign set-up including Campaign settings, Teams, Level ids, Creatures, Spells, Triggers, Equipment, Conditions and Furniture data


  // **property:** players, **type:** {Object}
  // Object containing current player data and settings in this Campaign
  var players = {

    // **property:** players.min, **type:** {Number:Integer}, **default:** 2
    // Minimum number of players possible in this Campaign
    min: 2,

    // **property:** players.max, **type:** {Number:Integer}, **default:** 2
    // Maximum number of players possible in this Campaign
    max: 2,

    // **property:** players.list, **type:** {Array:Player}, **default:** Empty array []
    // List of current players in this Campaign ('Player' Class)
    list: []

  };


  // **property:** teams, **type:** {Object}
  // Object containing current team data and settings in this Campaign
  var teams = {

    // **property:** teams.min, **type:** {Number:Integer}, **default:** 2
    // Minimum number of teams possible in this Campaign
    min: 2,

    // **property:** teams.max, **type:** {Number:Integer}, **default:** 2
    // Maximum number of teams possible in this Campaign
    max: 2,

    // **property:** teams.list, **type:** {Array:Team}, **default:** Empty array []
    // List of current teams in this Campaign ('Team' Class)
    // **NOTE:** team starting characters & map view settings (eg evil wizard player flag) will be defined in the Team object itself
    list: []

  };


  // **property:** levels, **type:** `Object`
  // Object containing current team data and settings in this Campaign
  var levels = {

    // **property:** levels.current, **type:** {Number:Integer}, **default:** 0
    // Id of the {levels.list} array which contains the current Level
    current: null,

    // **property:** levels.list, **type:** {Array:(String|Level)}, **default:** Empty array
    // An array containing either the level id {String} or the Level object itself after it has been loaded
    list: []

  };

  var init = function () {

    // TODO: convert DATA (JSON string) to JS objects?
    // TODO: create initial player settings from DATA
    // TODO: create initial team settings from DATA
    // TODO: create initial level settings from DATA

  };
  init();


};
