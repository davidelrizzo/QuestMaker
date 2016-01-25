
/* Player (initObj)
    name: String for display name
    isHuman: Boolean, true if player is not AI controlled
    creatures: Array of Creature init objects, creatures this player starts with
  ================================================ */

var Player = function(initObj) {
  'use strict';

  /* Private variables
  ****************************/
  initObj = initObj || {};
  var i;


  /* Public variables
  ****************************/
  this.name = initObj.name || "Anonymous player";
  this.isHuman = initObj.isHuman || true;
  this.creatures = [];


  /* Init
  ****************************/
  if( Array.isArray(initObj.creatures) ) {
    for( i=0 ; i<initObj.creatures.length ; i++ ) {
      this.creatures.push( new Creature(initObj.creatures[i]) );
    }
  }
  console.log( "New Player: "+this.name );

};
