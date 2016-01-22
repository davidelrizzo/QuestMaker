
var Player = function(initObj) {
  'use strict';


  /* Public variables
  ****************************/
  this.name = "Anonymous player";
  this.isHuman = true;
  this.creatures = [];


  /* Init
  ****************************/
  if( initObj.name ) this.name = initObj.name;
  if( initObj.isHuman ) this.isAI = initObj.isAI;
  if( initObj.creatures ) this.creatures.concat( initObj.creatures );
  console.log( "New Player: "+this.name );

};
