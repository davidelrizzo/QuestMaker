/*jslint browser: true, white: true*/
"use strict";


var qmapi = window.qmapi || {};

// Class: Campaign
// ======================================
// **Campaign(campaignJSON)** - class for campaign instance, takes campaign blueprint data {@arg: JSON}
qmapi.Campaign = function (campaignJSON) {


  // Check Campaign argument is a valid JSON string <br>
  // **TODO:** validate JSON format against schema
  try {
    JSON.parse(campaignJSON);
  } catch (e) {
    throw new Error("qmapi.Campaign must have a single JSON string of campaign data as the argument");
  }

  // **Campaign.DATA()** = Get blueprint data for this campaign {@return: JSON string}
  this.DATA = function () { return campaignJSON; };




  // Teams
  // --------------------------------------

  var _minTeams = 2;
  var _maxTeams = 2;

  // **Campaign.maxTeams()** - Get max teams for this campaign {@return: positive integer} <br>
  // **Campaign.maxTeams(n)** - Set max teams for this campaign {@arg: positive integer >= minTeams }
  this.maxTeams = function (n) {
    if (n === undefined) { return _maxTeams; }
    if (typeof n === 'number' && n > 0 && n >= _maxTeams) {
      _maxTeams = n;
      return n;
    }
    throw new Error("qmapi.Campaign.maxTeams must be a positive integer greater than or equal to minTeams.");
  };

  // **Campaign.minTeams()** - Get min teams for this campaign {@return: positive integer} <br>
  // **Campaign.minTeams(n)** - Set min teams for this campaign {@arg: positive integer <= maxTeams }
  this.minTeams = function (n) {
    if (n === undefined) { return _minTeams; }
    if (typeof n === 'number' && n > 0 && n <= _maxTeams ) {
      _minTeams = n;
      return n;
    }
    throw new Error("qmapi.Campaign.minTeams must be a positive integer less than or equal to maxTeams.");
  };

  // **Campaign.teams** - List of Teams in this campaign {@param: array of Teams}
  this.teams = [];




  // Players
  // --------------------------------------

  var _minPlayers = 2;
  var _maxPlayers = 2;

  // **Campaign.maxPlayers()** - Get max players for this campaign {@return: positive integer} <br>
  // **Campaign.maxPlayers(n)** - Set max players for this campaign {@arg: positive integer >= minPlayers }
  this.maxPlayers = function (n) {
    if (n === undefined) { return _maxPlayers; }
    if (typeof n === 'number' && n > 0 && n >= _maxPlayers) {
      _maxPlayers = n;
      return n;
    }
    throw new Error("qmapi.Campaign.maxPlayers must be a positive integer greater than or equal to minPlayers.");
  };

  // **Campaign.minPlayers()** - Get min players for this campaign {@return positive integer} <br>
  // **Campaign.minPlayers(n)** - Set min players for this campaign {@arg: positive integer <= maxPlayers }
  this.minPlayers = function (n) {
    if (n === undefined) { return _minPlayers; }
    if (typeof n === 'number' && n > 0 && n <= _maxPlayers ) {
      _minPlayers = n;
      return n;
    }
    throw new Error("qmapi.Campaign.minPlayers must be a positive integer less than or equal to maxPlayers.");
  };

  // **Campaign.players** - List of Players in this campaign {@param: array of Players}
  this.players = [];




  // Levels
  // --------------------------------------

  // **Campaign.currentLevel** - index of Campaign.levels pointing to current level {@param: array index (int)}
  this.currentLevel = 0;


  // **Campaign.levels** - List of Levels in this campaign {@param: array of Levels}
  this.levels = [];




  // Init
  // --------------------------------------
  // **TODO:** Create campaign from initial DATA, including Teams, Players and Levels




};

