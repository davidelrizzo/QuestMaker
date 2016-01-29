
var Campaign = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};
  var _this = this;
  var i;


  /* Public variables
  ****************************/
  this.name = initObj.name || "Default campaign";
  this.players = [];
  this.currentPlayerIndex = null;
  this.levels = [];
  this.currentLevelIndex = null;


  /* Init
  ****************************/
  // create Creature templates
  if( Array.isArray(initObj.creatures) ) Creature.TEMPLATES = initObj.creatures;
  console.log( "New Campaign: "+this.name );



  /* Public methods
  ****************************/

  // this.getCurrentPlayer = function() {
  //   return this.players[this.currentPlayerIndex];
  // };

  // this.getCurrentLevel = function() {
  //   return this.levels[this.currentLevelIndex];
  // };

  this.addPlayer = function(playerInitObj) {
    var newPlayer = new Player(playerInitObj);
    this.players.push(newPlayer);
    return newPlayer;
  };


  this.addCreature = function(creatureInitObj, tile, player) {
    var newCreature = new Creature(creatureInitObj, tile, player);
    if( tile instanceof Tile ) tile.creature = newCreature;
    // CONSIDER: what happens if a creature already exists here?
    if( player instanceof Player ) player.creatures.push(newCreature);
    return newCreature;
  };


  // Genrates new Level instance at campaign.levels[index]
  this.startLevel = function(index) {
    index = index || 0;
    this.currentLevelIndex = index;
    if(initObj.levels[index]) {
      return (this.levels[index] = new Level( initObj.levels[index] ));
    } else {
      throw new Error('Campaign: Level['+index+'] data does not exist.');
    }
  };


  // this.getNextActivePlayer = function() {
  //   if( this.currentPlayerIndex === null || this.currentPlayerIndex >= this.players.length ) {
  //     this.currentPlayerIndex = 0;
  //   } else {
  //     this.currentPlayerIndex++;
  //   }
  //   return this.players[this.currentPlayerIndex];
  // };


};
