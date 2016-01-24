
var Campaign = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.name = initObj.name || "Default campaign";
  this.players = [];
  this.currentLevel = null;


  /* Init
  ****************************/
  // create Creature templates
  if( Array.isArray(initObj.creatures) ) Creature.TEMPLATES = initObj.creatures;
  console.log( "New Campaign: "+this.name );



  /* Public methods
  ****************************/

  // Returns 'Level' object of next playable level
  this.getNextLevel = function() {
    var newLevel = null;
    if( this.currentLevel === null ) {
      if( Array.isArray(initObj.levels) ) {
        newLevel = new Level( initObj.levels[0] );
      } else {
        newLevel = new Level();
      }
    }
    return newLevel;
  };

};
