
var Creature = function(type) {
  'use strict';


  /* Static variables
  ****************************/
  //Creature.DATA - Blueprint data for all creatures


  /* Public variables
  ****************************/
  this.name = "Monster";


  /* Init
  ****************************/
  if( Creature.DATA ) {
    this.name = Creature.DATA[type].name;
  }
  console.log( "New Creature: "+this.name );

};
