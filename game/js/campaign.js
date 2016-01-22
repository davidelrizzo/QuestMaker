
var Campaign = function(initObj) {
  'use strict';


  /* Public variables
  ****************************/
  this.name = "Anonymous campaign";
  this.players = [];
  this.currentLevel = null;


  /* Init
  ****************************/
  if( initObj.name ) this.name = initObj.name;
  if( initObj.creatures ) Creature.DATA = initObj.creatures;
  if( initObj.levels ) Level.DATA = initObj.levels;
  console.log( "New Campaign: "+this.name );


  /* Public methods
  ****************************/
  this.getNextLevel = function() {
    var newLevel = null;
    if( this.currentLevel === null ) {
      newLevel = new Level( Level.DATA[0] );
    }
    return newLevel;
  };

};
