
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
  this.currentPlayerIndex = 0;
  this.levels = [];
  this.currentLevelIndex = 0;


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

  this.addPlayer = function(player) {
    this.players.push(player);
  };

  this.startLevel = function(index) {
    index = index || 0;
    this.currentLevelIndex = index;
    if(initObj.levels[index]) {
      return (this.levels[index] = new Level( initObj.levels[index] ));
    } else {
      throw new Error('Campaign: Level['+index+'] data does not exist.');
    }
  };


};
