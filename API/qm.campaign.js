// stop jsLint complaining about the global 'window' object
/*jslint browser: true*/

// Sets JavaScript to strict mode
"use strict";

// Creates the QuestMaker global namespace if it doesn't already exist
var QM = window.QM || {};
QM = function()  {


  /**********************************************************
  * CLASS: Campaign
  * ====
  * The Campaign class contains the methods used to run a campaign of game levels. It contains all data that is carried between levels.
  *
  * **argument:** {String:JSON} DATA - initial static loaded data for this campaign
  **********************************************************/
  class Campaign {



    /**********************************************************
    * CONSTRUCTOR
    * ----
    * Initialises Campaign properties with DATA passed in on Campaign creation
    **********************************************************/
    constructor(DATA) {



      // **property:** _DATA, **type:** {String:JSON}, **default:** Empty String ""
      // The DATA parameter contains all blueprint data for Campaign set-up including Campaign settings, Teams, Level (ids), Creatures, Spells, Triggers, Equipment, Conditions and Furniture data
      // QUESTION: Should we convert this JSON string to JS objects? Should we validate JSON to a Schema?
      this.DATA = _DATA;



      // **property:** _minPlayers, **type:** {Number:Integer}, **default:** 2
      // Minimum number of players possible in this Campaign
      this.minPlayers = 2;

      // **property:** _maxPlayers, **type:** {Number:Integer}, **default:** 2
      // Maximum number of players possible in this Campaign
      this.maxPlayers = 2;

      // **property:** players, **type:** {Array:Player}, **default:** Empty array []
      // List of current players in this Campaign ('Player' object), the index of this array is the ID of each player and should never change after initialisation
      this.players = [];

          // TODO: create initial player settings from DATA
          // this.minPlayers = DATA.Campaign.minPlayers;
          // this.maxPlayers = DATA.Campaign.maxPlayers;
          // for i in DATA.Campaign.Players
          //    this.addPlayer(DATA.Campaign.Players[i]);



      // **property:** _minTeams, **type:** {Number:Integer}, **default:** 2
      // Minimum number of teams possible in this Campaign
      this.minTeams = 2;

      // **property:** _maxTeams, **type:** {Number:Integer}, **default:** 2
      // Maximum number of teams possible in this Campaign
      this.maxTeams = 2;

      // **property:** teams, **type:** {Array:Team}, **default:** Empty array []
      // List of current teams in this Campaign ('Team' Class)
      // _NOTE:_ team starting characters & map view settings (eg evil wizard player flag) will be defined in the Team object itself, the index of this array is the ID of each team and should never change after initialisation
      this.teams = [];

          // TODO: create initial team settings from DATA
          // this.minTeams = DATA.Campaign.minTeams;
          // this.maxTeams = DATA.Campaign.maxTeams;
          // for i in DATA.Campaign.Teams
          //    this.addTeam(DATA.Campaign.Teams[i]);



      // **property:** currentLevel, **type:** {Number:Integer}, **default:** 0
      // Id of the {levels} array which contains the current Level
      this.currentLevel = 0;

      // **property:** levels, **type:** {Array:Level}, **default:** Empty array
      // An array containing the levels in this Campaign ('Level' object), Levels may contain only a name if the level has not been leaded yet
      this.levels = [];

          // TODO: create initial level settings from DATA
          // for i in DATA.Campaign.Levels
          //    this.addLevel(DATA.Campaign.Levels[i]);


    }


    /**********************************************************
    * METHOD: addPlayer
    * ----
    * Adds a new player to the campaign and initialises it with passed in values
    * **argument:** initData, **type:** {String:JSON}
    * **returns:** id of players array it was added at
    **********************************************************/
    addPlayer(initData) {

      // TODO: create {new Player}, initialise with {initData}, push onto players array and return player id
      // QUESTION: Should we validate the JSON data?

    };

    // QUESTION: is it worth creating removePlayer method yet as players are only added on campaign creation and never removed?


    /**********************************************************
    * METHOD: addTeam
    * ----
    * Adds a new team to the campaign and initialises it with passed in values
    * **argument:** initData, **type:** {String:JSON}
    * **returns:** id of teams array it was added at
    **********************************************************/
    addTeam(initData) {

      // TODO: create {new Team}, initialise with {initData}, push onto teams array and return team id
      // QUESTION: Should we validate the JSON data?

    };

    // QUESTION: is it worth creating removeTeam method yet as teams are only added on campaign creation and never removed?



    /**********************************************************
    * METHOD: addLevel
    * ----
    * Adds a new level to the campaign and initialises it with passed in values
    * **argument:** initData, **type:** {String:JSON}
    * **returns:** id of levels array it was added at
    **********************************************************/
    addLevel(initData) {

      // TODO: create {new Level}, initialise with {initData}, push onto levels array and return team id
      // QUESTION: Should we validate the JSON data?
      // QUESTION: it might be wiser to leave 'loading' to the Game engine as the API is only supposed to care about rule mechanics not file types and platform (it might be even easier to keep all level data in the Campaign data in the initial prototype to speed up development)

    };

    // QUESTION: is it worth creating removeLevel method yet as levels are only added on campaign creation and never removed?



  }

};
