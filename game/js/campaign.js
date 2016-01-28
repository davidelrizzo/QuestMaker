
var Campaign = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};
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

  this.getCurrentPlayer = function() {
    return this.players[this.currentPlayerIndex];
  };

  this.getCurrentLevel = function() {
    return this.levels[this.currentLevelIndex];
  };

  // Creates 'Level' object at given index of levels property
  this.generateLevel = function(index) {
    if(initObj.levels[index]) {
      return (this.levels[index] = new Level( initObj.levels[index] ));
    } else {
      throw new Error('Campaign: Level['+index+'] data does not exist.');
    }
  };


};
