/*jslint browser: true*/
"use strict";




// # CLASS Campaign
// Methods and data carried between levels
class Campaign {


  // ## CONSTRUCTOR
  // Takes a `String:JSON` containing init (blueprint) data for the whole campaign
  constructor(DATA) {


    // init data for campaign in `String:JSON` format
    this.DATA = _DATA;



    // A `Number:Integer` for min possible players in this campaign
    this.minPlayers = 2;

    // A `Number:Integer` for max possible players in this campaign
    this.maxPlayers = 2;

    // List of players in this campaign `Array:Player`. The index of this array is the ID of each player and should never change after initialisation
    this.players = [];

        /*
        TODO: create initial player settings from DATA
        this.minPlayers = DATA.Campaign.minPlayers;
        this.maxPlayers = DATA.Campaign.maxPlayers;
        for i in DATA.Campaign.Players
           this.addPlayer(DATA.Campaign.Players[i]);
        */



    // A `Number:Integer` for min possible teams in this campaign
    this.minTeams = 2;

    // A `Number:Integer` for max possible teams in this campaign
    this.maxTeams = 2;

    // List of teams in this campaign `Array:Player`.
    //
    // _NOTE: team starting characters & map view settings (eg evil wizard player flag) will be defined in the Team object itself, the index of this array is the ID of each team and should never change after initialisation_
    this.teams = [];

        /*
        TODO: create initial team settings from DATA
        this.minTeams = DATA.Campaign.minTeams;
        this.maxTeams = DATA.Campaign.maxTeams;
        for i in DATA.Campaign.Teams
           this.addTeam(DATA.Campaign.Teams[i]);
        */



    // `Number:Integer` indicating id of `levels` array with current level
    this.currentLevel = 0;

     // List of levels in this campaign `Array:Level`. Level may only contain name if it has not loaded yet.
    this.levels = [];

        /*
        TODO: create initial level settings from DATA
        for i in DATA.Campaign.Levels
           this.addLevel(DATA.Campaign.Levels[i]);
        */
  }


  // ## METHOD addPlayer
  // Adds a new player to the campaign and initialises it with passed in values <br>
  // Takes `String:JSON` init data and returns `Number:+Integer` id of `players` array it was added at
  addPlayer(initData) {

    /*
    TODO: create {new Player}, initialise with {initData}, push onto players array and return player id
    QUESTION: Should we validate the JSON data?
    */

  };


  // ## METHOD addTeam
  // Adds a new team to the campaign and initialises it with passed in values <br>
  // Takes `String:JSON` init data and returns `Number:+Integer` id of `teams` array it was added at
  addTeam(initData) {

    /*
    TODO: create {new Team}, initialise with {initData}, push onto teams array and return team id
    QUESTION: Should we validate the JSON data?
    */

  };



  // ## METHOD addLevel
  // Adds a new level to the campaign and initialises it with passed in values <br>
  // Takes `String:JSON` init data and returns `Number:+Integer` id of `levels` array it was added at
  addLevel(initData) {

    /*
    TODO: create {new Level}, initialise with {initData}, push onto levels array and return team id
    QUESTION: Should we validate the JSON data?
    QUESTION: it might be wiser to leave 'loading' to the Game engine as the API is only supposed to care about rule mechanics not file types and platform (it might be even easier to keep all level data in the Campaign data in the initial prototype to speed up development)
    */

  };

}

