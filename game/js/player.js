
var Player = function(initObj) {
  'use strict';


  /* Public variables
  ****************************/
  this.name = initObj.name || "Anonymous player";
  this.isHuman = initObj.isHuman || true;
  this.creatures = [];


  /* Init
  ****************************/
  if( Array.isArray(initObj.creatures) ) {
    for( var i=0 ; i<initObj.creatures.length ; i++ ) {
      this.creatures.push( new Creature( initObj.creatures[i] ) );
    }
  }
  console.log( "New Player: "+this.name );

};
